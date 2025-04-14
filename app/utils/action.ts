"use server"
import "../models/user";
import { auth, signIn, signOut } from "@/auth";
import { z } from "zod";
import Prompt from "../models/prompt";
import Tag from "../models/tags";
import { connectToDB } from "./database";
import { CreatePromptSchema, PromptActionState } from "@/schema/prompt.schema";
import mongoose from "mongoose";
import { permanentRedirect, redirect, RedirectType } from "next/navigation";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirectDynamicUrls } from "./redirect";


export async function signOutHelper() {
  await signOut();
}

function handleError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred.";
}

export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {

    const validated = LoginSchema.safeParse({ email, password });

    if (!validated.success) {
      return {
        data: {
        email,
        password,
        },
        errors: validated.error.flatten().fieldErrors,
      };
    }

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    permanentRedirect("/explore", RedirectType.replace);
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      return {
       data: {
        email,
        password,
        },
        errors: { general: ["Invalid email or password."] },
      };
    } else {
    return {
        data: {
        email,
        password,
        },
        errors: { general: ["Something bad occured."] },
      };
    }

  }
}

async function fetchPromptsWithPaginationAndFilter(
  query: string,
  tag: string | undefined,
  size: number,
  page: number,
  userId: string | null,
  additionalCriteria: object = {},
  sortBy: PromptSortType = "newest"
): Promise<IApiResponse<IPrompt[]>> {
  const searchCriteria: Record<string, unknown> = {
    $or: [
      { prompt: { $regex: query, $options: "i" } },
      { tag: { $regex: query, $options: "i" } },
    ],
  };

  if (tag) {
    searchCriteria["tag"] = tag;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sortOption: Record<string, any> = { createdAt: -1 };

  if (sortBy === "popular") {
    sortOption = { likes: -1 };
  } else if (sortBy === "alphabetical") {
    sortOption = { prompt: 1 };
  }

  // Define the base query, depending on the user's authentication status
  let queryObj: object = { ...searchCriteria, ...additionalCriteria };

  // If user is not authenticated, filter by public prompts only
  if (!userId) {
    queryObj = { ...queryObj, private: false };
  } else if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    // If authenticated, allow private prompts of the user and public prompts
    queryObj = {
      $and: [
        queryObj,
        {
          $or: [
            { creator: new mongoose.Types.ObjectId(userId) },
            { private: false },
          ],
        },
      ],
    };
  }

  try {
    await connectToDB();

    const prompts = await Prompt.find(queryObj)
      .populate("creator")
      .skip((page - 1) * size) // Pagination logic (skip records)
      .limit(size) // Limit to the number of items per page
      .sort(sortOption);

    return {
      data: JSON.parse(JSON.stringify(prompts)),
      message: "Prompts fetched successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return {
      error: handleError(error), // Assuming you have this helper
      message: "Failed to fetch prompts",
      status: 500,
    };
  }
}

export async function getPrompts(
  query: string,
  tag?: string,
  size = 10,
  page = 1
): Promise<IApiResponse<IPrompt[]>> {
  const userId = await getCurrentUserId();
  return fetchPromptsWithPaginationAndFilter(query, tag, size, page, userId);
}

export async function getTrendingTags(limit = 10): Promise<IApiResponse<string[]>> {
  try {
    await connectToDB();

    const tags: string[] = await Tag.find({}).select(['name']).sort({ count: -1 }).limit(limit);
    return {
      data: JSON.parse(JSON.stringify(tags)),
      message: "Trending tags fetched successfully",
      status: 200,
    };
  } catch (error) {
    return {
      error: handleError(error),
      message: "Failed to fetch trending tags",
      status: 500,
    };
  }
}




export async function getPromptsByCreator(
  creator: string,
  query: string,
  tag?: string,
  size = 10,
  page = 1
): Promise<IApiResponse<IPrompt[]>> {
  const userId = await getCurrentUserId();

  // Set additional criteria for creator-based filtering
  const additionalCriteria =
    userId === creator
      ? {} // No need to add extra criteria if the user is the creator
      : { private: false }; // Show only public prompts if the user is not the creator

  return fetchPromptsWithPaginationAndFilter(
    query,
    tag,
    size,
    page,
    userId,
    additionalCriteria
  );
}


export async function getPromptById(
  id: string
): Promise<IApiResponse<IPrompt>> {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(id)
      .populate("creator")
      .sort({ createdAt: -1 });

    return {
      data: JSON.parse(JSON.stringify(prompt)),
      message: "Prompt fetched successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return {
      error: handleError(error),
      message: "Failed to fetch prompt",
      status: 500,
    };
  }
}


export const createPrompt = async (
  _prevState: PromptActionState,
  payload: FormData
): Promise<PromptActionState> => {
  const formData = Object.fromEntries(payload.entries());
  console.log(formData);

    const fallbackData = {
      prompt: (formData.prompt as string) ?? "",
      tag: (formData.tag as string) ?? "",
      private: formData.private === "private",
    };

    try {
      const validated = CreatePromptSchema.safeParse(formData);

      if (!validated.success) {
        console.log(
          "Validation failed:",
          validated.error.flatten().fieldErrors
        );
        return {
          data: fallbackData,
          errors: validated.error.flatten().fieldErrors,
        };
      }

      await connectToDB();
      const creator = await getCurrentUserId();

      if (!creator) {
        return {
          data: fallbackData,
          errors: { general: ["User not authenticated."] },
        };
      }

      const newPrompt = new Prompt({
        ...validated.data,
        creator,
      });


      await newPrompt.save();
      console.log('newly created prompt: ', newPrompt);

      // return {
      //   data: validated.data,
      //   errors: {},
      // };
      const url = '/explore';
      const resolvedUrl = redirectDynamicUrls(url, 'success', 'Prompt created successfully.')
      revalidatePath(url);
      redirect(resolvedUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === "NEXT_REDIRECT") {
        throw error;
      }
      return {
        data: fallbackData,
        errors: { general: [handleError(error)] },
      };
    }
};

export const updatePrompt = async (
  _prevState: PromptActionState,
  payload: FormData
): Promise<PromptActionState> => {
  const formData = Object.fromEntries(payload.entries());
  const promptId = formData.id as string;

  const fallbackData = {
    prompt: (formData.prompt as string) ?? "",
    tag: (formData.tag as string) ?? "",
    private: formData.private === "private",
  };

  if (!promptId) {
    return {
      data: fallbackData,
      errors: { general: ["Prompt not found"] },
    };
  }

  try {
    const validated = CreatePromptSchema.safeParse(formData);

    if (!validated.success) {
      return {
        data: fallbackData,
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const creator = await getCurrentUserId();
    
    if (!creator) {
      return {
        data: fallbackData,
        errors: { general: ["User not authenticated."] },
      };
    }

    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(promptId);

    if (!existingPrompt) {
      return {
        data: fallbackData,
        errors: { general: ["Prompt not found."] },
      };
    }

    // Check if the current user is the creator of the prompt
    if (existingPrompt.creator.toString() !== creator) {
      return {
        data: fallbackData,
        errors: { general: ["You are not authorized to update this prompt."] },
      };
    }

    // Update the prompt data
    existingPrompt.set({
      ...validated.data,
      updatedAt: new Date(),
    });

    // Save the updated prompt
    await existingPrompt.save();

    const url = "/explore";
    const resolvedUrl = redirectDynamicUrls(
      url,
      "success",
      "Prompt updated successfully."
    );
    revalidatePath(url);
    redirect(resolvedUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === "NEXT_REDIRECT") {
        throw error;
      }
    return {
      data: fallbackData,
      errors: { general: [handleError(error)] },
    };
  }
};

export async function deletePrompt(
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  _prevState: FormActionState<{}>,
  formData: FormData
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
): Promise<FormActionState<{}>> {
  try {
    const promptId = formData.get("id") as string;
    console.log(_prevState.errors)
    if (!promptId) {
      return {
        errors: { general: ["Prompt not found"] },
      };
    }


    const creator = await getCurrentUserId();

    if (!creator) {
      return {
        errors: { general: ["User not authenticated."] },
      };
    }

    await connectToDB();

    // Find the prompt by ID
    const prompt = await Prompt.findById(promptId);

    if (!prompt) {
      return {
        errors: { general: ["Prompt not found"] },
      };
    }


    // Check if the current user is the creator of the prompt
    if (prompt.creator.toString() !== creator) {
      return {
        errors: { general: ["You are not authorized to delete this prompt."] },
      };
    }

    // Delete the prompt
    await Prompt.deleteOne({ _id: promptId });

    const url = "/explore";
    const resolvedUrl = redirectDynamicUrls(
      url,
      "success",
      "Prompt deleted successfully."
    );
    revalidatePath(url);
    redirect(resolvedUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    // If the error is a redirect error, we rethrow it for Next.js handling
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }

    return {
      errors: { general: ["Failed to delete prompt."] },
    };
  }
}


