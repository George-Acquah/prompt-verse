import { getPrompts } from "@/app/utils/action";
import PromptCard from "./PromptCard";

const PromptList = async ({ page, size, query, tag }: _ISearchQuery) => {
  const { data: prompts } = await getPrompts(query);
  return (
    <div className="mt-16 prompt_layout">
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