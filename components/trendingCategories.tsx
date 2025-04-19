// components/trendingCategories.tsx
import Link from "next/link";
import { getTrendingTags } from "@/app/utils/action";
import { Typography } from "./ui/typography";
import { IconArrowRight, IconExternalLink as IconHash } from "./ui/icons";

export const TrendingCategories = async ({
  compact,
}: {
  compact?: boolean;
}) => {
  const { data: tags = []} = await getTrendingTags(compact ? 8 : 12);

  return (
    <div className={compact ? "" : "space-y-6"}>
      {!compact && (
        <Typography variant="h2" className="font-semibold">
          Popular Categories
        </Typography>
      )}

      <div
        className={`grid ${compact ? "grid-cols-2 gap-2" : "gap-4"}`}
        style={{
          gridTemplateColumns: compact
            ? undefined
            : "repeat(auto-fit, minmax(120px, max-content))",
        }}
      >
        {tags.map((tag) => (
          <Link
            key={tag._id}
            href={`/explore?tag=${encodeURIComponent(tag.name)}`}
            className={`group flex items-center ${
              compact ? "px-3 py-2 text-sm" : "px-4 py-3"
            } rounded-lg bg-white/70 dark:bg-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors`}
          >
            <IconHash className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
            <Typography
              variant="span"
              className="truncate font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            >
              {tag.name}
            </Typography>
          </Link>
        ))}
      </div>

      {!compact && (
        <div className="mt-8 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            View All Categories
            <IconArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
