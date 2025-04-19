import { connectToDB } from "@/app/utils/database";
import Tag from "../../models/tags";
import { NextRequest } from "next/server";

function handleError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred.";
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 0;
    console.warn(limit);
  
      const tags: string[] = await Tag.find({}).select(['name']).sort({ count: -1 }).limit(limit);
    
    return new Response(JSON.stringify(tags), { status: 200 });
    // return {
    //     data: JSON.parse(JSON.stringify(tags)),
    //     message: "Trending tags fetched successfully",
    //     status: 200,
    //   };
  } catch (error) {
    console.log(handleError(error));
    return new Response(JSON.stringify("Failed to fetch trending tags"), {
      status: 500,
    });
      // return {
      //   error: handleError(error),
      //   message: "Failed to fetch trending tags",
      //   status: 500,
      // };
    }
};
