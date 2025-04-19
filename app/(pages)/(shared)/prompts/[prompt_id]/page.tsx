import { getPromptById } from "@/app/utils/action";
import { auth } from "@/auth";
import { CopyPrompt, PromptTag, SharePrompt } from "@/components/promptClients";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
// import { notFound } from "next/navigation";

type Params = {
  params: Promise<{
    prompt_id: string;
  }>;
};

const PromptPage = async ({ params }: Params) => {
  const { prompt_id } = await params;
  const { data: prompt } = await getPromptById(prompt_id);
  const session = await auth();

  if (!prompt) {
    // notFound();
    return;
  }

  return (
    <div className="prompt_page mx-auto max-w-4xl p-6">
      {/* Header with creator's details */}
      <div className="flex flex-col items-start gap-4 border-b border-gray-300 pb-4 mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/profile/${prompt.creator._id}`}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Image
              src={prompt.creator.image}
              alt="creator_image"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl text-gray-900">
                {prompt.creator.username}
              </h3>
              <p className="text-sm text-gray-600">{prompt.creator.email}</p>
            </div>
          </Link>
        </div>

        {/* Copy and share buttons */}
        <div className="flex items-center gap-4 mt-4">
          <CopyPrompt prompt={prompt.prompt} />
          <SharePrompt prompt={prompt.prompt} />
        </div>
      </div>

      {/* Prompt content */}
      <div className="prompt_content mb-8">
        <p className="text-lg text-gray-800 font-medium">{prompt.prompt}</p>
      </div>

      {/* Prompt tag */}
      <Suspense fallback={<>tags...</>}>
        <PromptTag tag={prompt.tag} />
      </Suspense>

      {/* If the user is the creator, show edit and delete options */}
      {session?.user?.id === prompt.creator._id && (
        <div className="mt-6 flex gap-6 border-t border-gray-300 pt-4">
          <Link
            href={`/prompts/${prompt._id}/update-prompt`}
            className="text-green-500 font-semibold cursor-pointer"
          >
            Edit
          </Link>
          <p
            className="text-red-500 font-semibold cursor-pointer"
            // onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptPage;
