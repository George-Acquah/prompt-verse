// app/page.tsx
import Hero from "@/components/hero";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";
import { FeatureCards } from "@/components/featureCards";
import { PromptShowcase } from "@/components/showcase";
import { Testimonials } from "@/components/testimonials";
import { IconSparkles, IconCommunity, IconOpenSource } from "@/components/ui/icons";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Home",
};

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Hero />
      <div className="z-20 bg-white dark:bg-gray-900/50 backdrop-blur-lg">
        <Stats
          stats={[
            { value: "10K+", label: "Active Users" },
            { value: "50K+", label: "Prompts Generated" },
            { value: "100+", label: "Categories" },
          ]}
        />
        <FeatureCards
          features={[
            {
              icon: <IconSparkles className="w-8 h-8" />,
              title: "AI-Powered Creativity",
              description:
                "Generate high-quality prompts with our advanced AI models",
            },
            {
              icon: <IconCommunity className="w-8 h-8" />,
              title: "Vibrant Community",
              description: "Share and discover prompts from creators worldwide",
            },
            {
              icon: <IconOpenSource className="w-8 h-8" />,
              title: "Open Source",
              description: "Transparent and customizable to your needs",
            },
          ]}
        />
        <Testimonials
          testimonials={[
            {
              quote:
                "This platform revolutionized my content creation workflow",
              author: "Sarah K.",
              role: "Content Creator",
            },
            {
              quote: "The prompt quality is unmatched compared to other tools",
              author: "James L.",
              role: "AI Engineer",
            },
          ]}
        />
        <PromptShowcase
          prompts={[
            {
              title: "Blog Post Generator",
              description: "Create engaging blog posts about any topic",
              category: "Writing",
            },
            {
              title: "Code Explainer",
              description: "Get explanations for complex code snippets",
              category: "Programming",
            },
            {
              title: "Marketing Copy",
              description: "Generate compelling ad copy in seconds",
              category: "Marketing",
            },
          ]}
        />
        <CTA
          title="Ready to boost your creativity?"
          description="Join thousands of creators already using PromptVerse"
          primaryAction={{ label: "Get Started", href: "/auth/sign-up" }}
          secondaryAction={{ label: "Browse Prompts", href: "/explore" }}
        />
      </div>
    </div>
  );
};

export default Home;
