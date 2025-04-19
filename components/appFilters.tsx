'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCollapsible,
} from "./ui/dropdown";
import { Typography } from "./ui/typography";
import { CSSProperties  } from "react";
import { cn } from "@/lib/utils";
import { IconAdjustmentsHorizontal } from "./ui/icons";
import useCustomSearchParams from "@/lib/hooks/use-custom-search.hook";

interface IDropdownArray {
  label: string;
  value: string;
}

const feedsOptions: IDropdownArray[] = [
  { label: "All", value: "all" },
  { label: "Private", value: "private" },
  { label: "Public", value: "public" },
];

const sortOptions: IDropdownArray[] = [
  { label: "Newest", value: "newest" },
  { label: "Popular", value: "popular" },
  { label: "A → Z", value: "alphabetical" },
];

const AppFilters = ({
  filterStyles,
  className,
  tags,
}: {
  filterStyles: CSSProperties | undefined;
  className?: string;
  tags: _ITrendingTags[];
}) => {
  const {
    handleSetParams,
    modalValue: value,
    paramValues,
  } = useCustomSearchParams("PRIVACY_STATUS", ["TAG", "SORT"]);

  const tagValue = paramValues.TAG;
  const sortValue = paramValues.SORT;

  return (
    <DropdownMenu
      trigger={<IconAdjustmentsHorizontal className="w-6 h-6 cursor-pointer" />}
      style={filterStyles}
      className={cn(
        "dark:bg-neutral-800 bg-white ring-0 w-[18rem] lg:w-[36rem] rounded-md px-1",
        className
      )}
    >
      {(onClose) => (
        <DropdownMenuContent>
          {/* Privacy Filter Section */}
          <DropdownMenuCollapsible
            trigger={
              <DropdownMenuLabel>
                <Typography variant="h5">Filter by Privacy</Typography>
              </DropdownMenuLabel>
            }
            headerClassName="bg-gray-100 dark:bg-neutral-800"
            contentClassName="bg-white dark:bg-neutral-900"
          >
            {feedsOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  handleSetParams(value !== option.value, option.value);
                  onClose();
                }}
                className={`${value === option.value ? "bg-gray-200" : ""}`}
              >
                <Typography variant="span">{option.label}</Typography>
              </DropdownMenuItem>
            ))}
          </DropdownMenuCollapsible>

          <DropdownMenuSeparator />

          {/* Tag Filter Section */}
          <DropdownMenuCollapsible
            trigger={
              <DropdownMenuLabel>
                <Typography variant="h5">Filter by Tag</Typography>
              </DropdownMenuLabel>
            }
            headerClassName="bg-gray-100 dark:bg-neutral-800"
            contentClassName="bg-white dark:bg-neutral-900"
          >
            {tags.map((tag) => (
              <DropdownMenuItem
                key={tag._id}
                onClick={() => {
                  handleSetParams(tagValue !== tag.name, tag.name, "TAG");
                  onClose();
                }}
                className={`${tagValue === tag.name ? "bg-gray-200" : ""}`}
              >
                <Typography variant="span">#{tag.name}</Typography>
              </DropdownMenuItem>
            ))}
          </DropdownMenuCollapsible>

          <DropdownMenuSeparator />

          {/* Sort Section */}
          <DropdownMenuCollapsible
            trigger={
              <DropdownMenuLabel>
                <Typography variant="h5">Sort By</Typography>
              </DropdownMenuLabel>
            }
            headerClassName="bg-gray-100 dark:bg-neutral-800"
            contentClassName="bg-white dark:bg-neutral-900"
          >
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  handleSetParams(
                    sortValue !== option.value,
                    option.value,
                    "SORT"
                  );
                  onClose();
                }}
                className={`${sortValue === option.value ? "bg-gray-200" : ""}`}
              >
                <Typography variant="span">{option.label}</Typography>
              </DropdownMenuItem>
            ))}
          </DropdownMenuCollapsible>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default AppFilters;
