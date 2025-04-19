'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  tags
}: {
  filterStyles: CSSProperties | undefined;
    className?: string;
  tags: _ITrendingTags[]
  }) => {
  // const [tagsData, setTagsData] = useState<_ITrendingTags[]>([]);
  const {
    handleSetParams,
    modalValue: value,
    paramValues,
  } = useCustomSearchParams("PRIVACY_STATUS", ["TAG", "SORT"]);

  // useEffect(() => {
  //   const fetchTags = async () => {
  //       try {
  //         const response = await fetch(`/api/tags?limit=${5}`);
    
  //         if (!response.ok) {
  //           throw new Error("Fetch failed");
  //         }
    
  //         const responseData = (await response.json()) as _ITrendingTags[];
  //         setTagsData(responseData);
  //       } catch (err) {
  //         console.log(err);
  //         setTagsData([]);
  //       } finally {
          
  //       }
  //     };
  //   fetchTags();
    
  // }, [])

  const tagValue = paramValues.TAG;
  const sortValue = paramValues.SORT;
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
                handleSetParams(value !== option.value, option.value);
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

          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <Typography variant="h5">Sort By</Typography>
          </DropdownMenuLabel>
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
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default AppFilters;
