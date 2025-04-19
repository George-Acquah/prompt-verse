import { IconUsers, IconFiles, IconCategory } from "./ui/icons";

export const Stats = ({
  stats,
}: {
  stats: { value: string; label: string }[];
}) => {
  const icons = [
    <IconUsers key="users" />,
    <IconFiles key="files" />,
    <IconCategory key="category" />,
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-3 lg:gap-x-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="rounded-full bg-blue-100/50 dark:bg-blue-900/30 p-4 mb-4">
                <div className="h-6 w-6 text-blue-600 dark:text-blue-400">
                  {icons[index]}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
