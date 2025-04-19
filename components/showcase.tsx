// components/prompt-showcase.tsx
import Link from "next/link";

export const PromptShowcase = ({
  prompts,
}: {
  prompts: {
    title: string;
    description: string;
    category: string;
  }[];
}) => {
  return (
    <section className="py-12 bg-gray-50/50 dark:bg-gray-900/30 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Popular Prompts
          </h2>
          <Link
            href="/explore"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <div
              key={prompt.title}
              className="group bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {prompt.category}
              </span>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                {prompt.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {prompt.description}
              </p>
              <div className="mt-4">
                <button className="text-sm font-medium text-blue-600 group-hover:underline dark:text-blue-400">
                  Try this prompt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
