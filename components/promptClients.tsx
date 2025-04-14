/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { IconShare } from "./ui/icons";
import useCustomSearchParams from "@/lib/hooks/use-custom-search.hook";
import { deletePrompt } from "@/app/utils/action";

export const SharePrompt = ({ prompt }: { prompt: string }) => {
  const handleShareClick = () => {
    navigator.clipboard.writeText(prompt);
    const chatGPTURL = `https://chat.openai.com`;
    window.open(chatGPTURL, "_blank");
  };
  return (
    <div className="flex items-center gap-x-1">
      <Button
        variant="ghost"
        className="h-6 w-6 p-0 hover:bg-background"
        onClick={handleShareClick}
      >
        <IconShare />
        <span className="sr-only">Share</span>
      </Button>
    </div>
  );
};

export const CopyPrompt = ({ prompt }: { prompt: string }) => {
  const [copied, setCopied] = useState<string>("");

  const handleCopy = () => {
    setCopied(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="flex items-center gap-x-1">
      <div className="copy_btn" onClick={handleCopy}>
        <Image
          src={
            copied === prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
          }
          alt="copy_icon"
          width={12}
          height={12}
        />
      </div>
    </div>
  );
};

export const PromptTag = ({ tag }: { tag: string }) => {
  const { handleSetParams } = useCustomSearchParams("TAG");

  return (
    <div className="mt-2">
      <p
        className="text-sm text-blue-500 cursor-pointer hover:underline"
        onClick={() => handleSetParams(true, tag)}
      >
        #{tag}
      </p>
    </div>
  );
};

export const DeletePrompt = ({ prompt_id }: { prompt_id: string }) => {
  const [_, action, isPending] = useActionState(deletePrompt, {});
  return (
    <form action={action}>
      <input
        type="text"
        name="id"
        defaultValue={prompt_id}
        className="hidden"
      />
      <button
        className="font-inter text-sm orange_gradient cursor-pointer"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
};
