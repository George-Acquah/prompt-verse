// app/categories/page.tsx
import { TrendingCategories } from "@/components/trendingCategories";
import { Typography } from "@/components/ui/typography";
import { Suspense } from "react";

export default function CategoriesPage() {
  return (
    <main className="w-full py-12">
      <div className="container px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Typography variant="h1" className="mb-4">
            All Categories
          </Typography>
          <Typography
            variant="p"
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Browse prompts by specific topics and categories
          </Typography>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-sm">
          <Suspense
            fallback={
              <div className="h-64 bg-gray-200/50 dark:bg-gray-800/50 rounded-xl animate-pulse" />
            }
          >
            <TrendingCategories compact />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
