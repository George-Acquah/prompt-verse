import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CopyPrompt, DeletePrompt, PromptTag, SharePrompt } from "./promptClients";
import { auth } from "@/auth";

type Props = {
  prompt: IPrompt;
};

const PromptCard = async ({ prompt }: Props) => {
  const session = await auth();
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link
          href={prompt.creator._id === session?.user?.id ? `/profile` : `/profile/${prompt.creator._id}?name=${prompt.creator.username}}`}
          className="flex-1 flex justify-start items-center gap-5 cursor-pointer"
        >
          <Image
            src={prompt.creator.image}
            alt="user_img"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900`">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-x-1">
          <CopyPrompt prompt={prompt.prompt} />
          <SharePrompt prompt={prompt.prompt} />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <PromptTag tag={prompt.tag} />

      {session?.user?.id === prompt.creator._id && (
        <div className="mt-5 flex-end gap-5 border-t border-gray-200 pt-3">
          <DeletePrompt prompt_id={prompt._id} />
          <Link
            href={`/prompts/${prompt._id}/update-prompt`}
            className="blue_btn"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
