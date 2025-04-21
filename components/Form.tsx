"use client";

import { useActionState, ChangeEvent, useState } from "react";
import Input from "./ui/input";
import { createUpdatePromptFields } from "@/lib/constants/form.constant";
import useCancelClick from "@/lib/hooks/use-cancel-click.hook";

interface _IForm<T extends Record<string, unknown>> {
  type: "create" | "update";
  initialState: FormActionState<T>;
  action: (
    _prevState: FormActionState<T>,
    payload: FormData
  ) => Promise<FormActionState<T>>;
  id?: string;
}

const Form = <T extends Record<string, unknown>>({
  type,
  initialState,
  action,
  id,
}: _IForm<T>) => {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [promptType, setPromptType] = useState(
    state?.data?.private ? "private" : "public"
  );
  const { handleCancelClick } = useCancelClick();

  const handlePromptTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromptType(e.target.value);
  };


  return (
    <form
      action={formAction}
      className="mt-6 mb-8 sm:mb-20 w-full max-w-5xl gap-7 glassmorphism"
    >
      <div className="flex flex-col sm:mx-auto sm:w-2/3">
        {type === "update" && id && (
          <input type="text" defaultValue={id} name={"id"} className="hidden" />
        )}
        {createUpdatePromptFields.map((field) => (
          <Input
            key={field.id}
            {...field}
            errors={state.errors?.[field.id]}
            value={
              field.id === "private"
                ? promptType
                : state.data?.[field.id as keyof typeof state.data]
            }
            onChange={
              field.id === "private" ? handlePromptTypeChange : undefined
            }
          />
        ))}

        <div className="flex-end mx-3 mt-5 gap-4">
          <button
            onClick={handleCancelClick}
            className="text-gray-500 dark:text-white text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-1.5 text-sm bg-[#FF5722]/90 rounded-full text-white capitalize cursor-pointer disabled:bg-[#FF5722]/30 disabled:cursor-auto md:text-base"
          >
            {isPending ? "Please wait ..." : type}
          </button>
        </div>

        {state?.errors?.general && (
          <p className="text-red-500 text-sm mt-2">
            {state.errors.general.join(", ")}
          </p>
        )}
      </div>
    </form>
  );
};

export default Form;
