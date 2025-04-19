// components/skeletons/promptListSkeleton.tsx
export const PromptListSkeleton = () => (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
      />
    ))}
  </div>
);


export const SearchSkeleton = () => (
  <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
);
