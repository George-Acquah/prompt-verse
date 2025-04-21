import { Typography } from "./ui/typography";
import Link from "next/link";
import { Button } from "./ui/button";
import { IconFiles } from "./ui/icons";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

const EmptyState = ({ title, message, actionLabel, actionHref }: EmptyStateProps) => {
  return (
    <div className="text-center py-12 space-y-4">
      <IconFiles className="mx-auto h-12 w-12 text-gray-400" />
      <Typography variant="h4" className="mt-4 font-medium">
        {title}
      </Typography>
      <Typography variant="p" className="mt-2">
        {message}
      </Typography>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="default">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
