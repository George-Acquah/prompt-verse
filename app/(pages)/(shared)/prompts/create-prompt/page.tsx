import React from "react";
import Form from "@/components/Form";
import { FormDataType, PromptActionState } from "@/schema/prompt.schema";
import { createPrompt } from "@/app/utils/action";

const CreatePrompt = async () => {
  const initialState: PromptActionState = {
    errors: {},
    data: {
      prompt: "",
      tag: "",
      private: false,
    },
  };
  return (
    <section className="w-full max-w-full flext-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient capitalize">Create Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        Create and share amazing prompts with the world, and let your
        imagination run wild with any{" "}
        <span className="orange_gradient font-medium">AI-Powered</span>{" "}
        platform.
      </p>

      <Form<FormDataType>
        type="create"
        initialState={initialState}
        action={createPrompt}
      />
    </section>
  );
};

export default CreatePrompt;
