"use client";

import { useActionState, ChangeEvent, useState } from "react";
import Link from "next/link";
import Input from "./ui/input";
import { createUpdatePromptFields } from "@/lib/constants/form.constant";

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

  const handlePromptTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromptType(e.target.value);
  };

  return (
    <form
      action={formAction}
      className="mt-6 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
    >
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
          onChange={field.id === "private" ? handlePromptTypeChange : undefined}
        />
      ))}

      <div className="flex-end mx-3 mb-5 gap-4">
        <Link href="/" className="text-gray-500 text-sm md:text-base">
          Cancel
        </Link>
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
    </form>
  );
};

export default Form;
