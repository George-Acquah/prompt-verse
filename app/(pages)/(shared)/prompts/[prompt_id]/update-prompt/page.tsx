import { getPromptById, updatePrompt } from "@/app/utils/action";
import Form from "@/components/Form";
import { FormDataType, PromptActionState } from "@/schema/prompt.schema";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{
    prompt_id: string;
  }>;
};
const EditPrompt = async ({ params }: Params) => {
  const { prompt_id } = await params;
  const { data } = await getPromptById(prompt_id);

  if (!data) {
    notFound();
  }

  const initialState: PromptActionState = {
    errors: {},
    data: {
      prompt: data?.prompt,
      tag: data?.tag,
      private: data?.private,
    },
  };

  return (
    <section className="w-full max-w-full flext-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient capitalize">Edit Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        Edit and share amazing prompts with the world, and let your imagination
        run wild with any{" "}
        <span className="orange_gradient font-medium">AI-Powered</span>{" "}
        platform.
      </p>

      <Form<FormDataType>
        type="update"
        initialState={initialState}
        action={updatePrompt}
        id={data._id}
      />
    </section>
  );
};

export default EditPrompt;
