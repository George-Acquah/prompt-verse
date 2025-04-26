import { Typography } from "./ui/typography";
import Link from "next/link";
import { IconFiles } from "./ui/icons";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

const EmptyState = ({
  title,
  message,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "py-12 px-4 sm:py-0",
        "max-w-2xl mx-auto",
        "text-center space-y-4 ",
        className
      )}
    >
      <div className="relative">
        <IconFiles className="mx-auto h-14 w-14 text-gray-400 dark:text-gray-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      </div>

      <div className="sm:space-y-2">
        <Typography
          variant="h4"
          className="mt-4 font-medium text-gray-900 dark:text-white"
        >
          {title}
        </Typography>

        <Typography
          variant="p"
          className="mt-2 text-gray-600 dark:text-gray-400 max-w-prose"
        >
          {message}
        </Typography>
      </div>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className={cn(
            "mt-6 px-6 py-3 text-sm font-medium",
            "text-white dark:text-white/90",
            "bg-blue-600 dark:bg-blue-500",
            "hover:bg-blue-700 dark:hover:bg-blue-600",
            "transition-all duration-200",
            "rounded-full shadow-md hover:shadow-lg",
            "focus-visible:outline focus-visible:outline-2",
            "focus-visible:outline-offset-2 focus-visible:outline-blue-600",
            "inline-flex items-center justify-center",
            "transform hover:-translate-y-0.5 active:translate-y-0",
            "min-w-[180px]"
          )}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
