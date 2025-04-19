// components/feature-cards.tsx
export const FeatureCards = ({
  features,
}: {
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}) => {
  return (
    <section className="py-12 bg-gray-50/50 dark:bg-gray-900/30 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-10 w-10 text-blue-600 dark:text-blue-400">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
