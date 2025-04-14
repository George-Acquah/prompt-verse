import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown";
import { Typography } from "./ui/typography";
import { CSSProperties } from "react";
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

const AppFilters = ({
  filterStyles,
  className,
  tagsData = []
}: {
  filterStyles: CSSProperties | undefined;
    className?: string;
    tagsData?: string[];
}) => {
  const { handleSetParams, modalValue: value, paramValues } =
    useCustomSearchParams("PRIVACY_STATUS", ['TAG']);
  
  const tagValue = paramValues.TAG;
  return (
    <DropdownMenu
      trigger={<IconAdjustmentsHorizontal className="w-6 h-6 cursor-pointer" />}
      style={filterStyles}
      className={cn(
        "dark:bg-neutral-800 bg-white ring-0 w-86  lg:w-[36rem] rounded-md px-1",
        className
      )}
    >
      {(onClose) => (
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Typography variant="h5">Filter by Privacy</Typography>
          </DropdownMenuLabel>
          {feedsOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                handleSetParams(true, option.value);
                onClose();
              }}
              className={`${value === option.value ? "bg-gray-200" : ""}`}
            >
              <Typography variant="span">{option.label}</Typography>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="mt-2">
            <Typography variant="h5">Filter by Tag</Typography>
          </DropdownMenuLabel>
          {tagsData.map((tag) => (
            <DropdownMenuItem
              key={tag}
              onClick={() => {
                handleSetParams(true, tag, 'TAG');
                onClose();
              }}
              className={`${tagValue === tag ? "bg-gray-200" : ""}`}
            >
              <Typography variant="span">#{tag}</Typography>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default AppFilters;
