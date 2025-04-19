import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] md:h-[70vh] overflow-hidden">
      {/* Background layers */}
      <div className={cn("main")} aria-hidden="true">
        <div className="gradient" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col flex-center h-[95%] px-4 mx-auto max-w-7xl">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300">
            Discover & Share
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              AI-Powered Prompts
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 animate-fade-in-delay">
            PromptVerse is an open-source AI prompting tool for modern world to
            discover, create and share creative prompts
          </p>

          <div className="flex-center gap-4 mt-6 sm:mt-10 animate-fade-in-delay-more">
            <button className="px-8 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600">
              Get Started
            </button>
            <button className="px-8 py-3 text-sm font-semibold transition-all duration-300 bg-white rounded-full shadow-lg text-gray-900 hover:bg-gray-100  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              View Prompts →
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-delay-more">
          <div className="flex flex-col items-center">
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Scroll to explore
            </p>
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-300 rounded-full flex justify-center">
              <div className="scroll-indicator-dot" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating prompt cards */}
      <div className="absolute top-1/4 left-10 animate-float-in">
        <div className="w-32 h-40 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 rotate-6 dark:bg-gray-800/80">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Write a poem about...
          </p>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-10 animate-float-in-delay">
        <div className="w-32 h-40 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 -rotate-3 dark:bg-gray-800/80">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Generate code for...
          </p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
