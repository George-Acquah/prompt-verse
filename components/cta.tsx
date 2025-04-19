// components/cta.tsx
import Link from "next/link";

export const CTA = ({
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
}) => {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl px-6 py-12 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={primaryAction.href}
                className="px-8 py-3 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
              >
                {primaryAction.label}
              </Link>
              <Link
                href={secondaryAction.href}
                className="px-8 py-3 text-sm font-semibold text-gray-900 bg-white rounded-full shadow-lg hover:bg-gray-100  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {secondaryAction.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
