import { Typography } from "./ui/typography";
import Link from "next/link";
import { Button } from "./ui/button";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

const EmptyState = ({ message, actionLabel, actionHref }: EmptyStateProps) => {
  return (
    <div className="text-center py-12 space-y-4">
      <Typography variant="h4">{message}</Typography>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="default">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
