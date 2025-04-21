"use client";

import { profileTabs } from "@/lib/data";
import { TabsList, TabsTrigger } from "./ui/tabs";
import useCustomSearchParams from "@/lib/hooks/use-custom-search.hook";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const ProfileTabLists = () => {
  const { modalValue = "prompts", handleSetParams } =
    useCustomSearchParams("TAB");

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = profileTabs.findIndex(
      (tab) => tab.value === modalValue
    );

    if (activeIndex >= 0 && tabsRef.current && tabRefs.current[activeIndex]) {
      const tabElement = tabRefs.current[activeIndex];
      const container = tabsRef.current;

      if (tabElement) {
        const containerWidth = container.offsetWidth;
        const tabLeft = tabElement.offsetLeft;
        const tabWidth = tabElement.offsetWidth;

        const scrollTo = tabLeft - containerWidth / 2 + tabWidth / 2;

        container.scrollTo({
          left: scrollTo,
          behavior: "smooth",
        });
      }
    }
  }, [modalValue]);

  return (
    <div className="w-full overflow-hidden">
      <TabsList
        ref={tabsRef}
        className={cn(
          "flex w-full gap-1 bg-muted p-1 rounded-lg",
          "overflow-x-auto scrollbar-hide snap-x pl-[130px] sm:pl-0" // 👈 KEY FIX
        )}
        style={{
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "1rem", // 👈 JS scroll snapping fix
          WebkitOverflowScrolling: "touch",
        }}
      >
        {profileTabs.map((tab, index) => {
          const Icon = tab.icon;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={cn(
                "flex items-center justify-center gap-1 cursor-pointer",
                "snap-start min-w-[calc(50%-0.5rem)] sm:min-w-auto sm:w-full sm:flex-shrink-1",
                "px-4 py-2",
                modalValue === tab.value
                  ? "bg-gray-200 dark:bg-gray-500 text-foreground shadow-sm"
                  : "hover:text-foreground"
              )}
              onClick={() => handleSetParams(true, tab.value)}
            >
              <span className="flex items-center gap-1">
                {Icon}
                <span className="text-sm sm:text-base">{tab.label}</span>
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
};

export default ProfileTabLists;
