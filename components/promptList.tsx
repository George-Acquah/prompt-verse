import { getPrompts } from "@/app/utils/action";
import PromptCard from "./PromptCard";

const PromptList = async ({ page, size, query, tag, sort }: _ISearchQuery) => {
  const { data: prompts } = await getPrompts(query, tag, sort, size, page);
  return (
    <div className="mt-8 lg:mt-16 prompt_layout">
      {prompts?.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
        />
      ))}
    </div>
  );
}

export default PromptList;