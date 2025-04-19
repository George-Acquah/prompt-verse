// components/testimonials.tsx
export const Testimonials = ({
  testimonials,
}: {
  testimonials: {
    quote: string;
    author: string;
    role: string;
  }[];
}) => {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Loved by creators worldwide
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-sm"
            >
              <blockquote className="text-gray-700 dark:text-gray-300">
                <p className="text-lg">{`"${testimonial.quote}"`}</p>
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
