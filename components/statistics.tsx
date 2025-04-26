import { Typography } from "./ui/typography";
import { IconChartBar, IconRefresh, IconRocket } from "./ui/icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Statistics() {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
        "rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow",
        "relative overflow-hidden"
      )}
    >
      {/* Decorative elements */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-20" />
      <div className="absolute -left-5 -bottom-5 w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-20" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <IconChartBar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <Typography
            variant="h3"
            className="font-semibold text-gray-900 dark:text-white"
          >
            Your Statistics
          </Typography>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-400"
            >
              We&apos;re crunching the numbers to bring you powerful insights.
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="outline" className="gap-2">
              <IconRefresh className="w-4 h-4" />
              Refresh
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <IconRocket className="w-4 h-4" />
              Get Notified When Ready
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
