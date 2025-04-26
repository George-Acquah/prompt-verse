'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconArrowUp } from '@/components/ui/icons'
import { useScrollPosition } from '@/lib/hooks/use-scroll-position'

export function ButtonScrollToTop({
  className,
  threshold = 300,
  ...props
}: ButtonProps & { threshold?: number }) {
  const { isScrolled } = useScrollPosition(threshold);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed right-6 bottom-4 sm:bottom-6 cursor-pointer z-50 border-gray-300 dark:border-gray-700",
        "size-12 rounded-full shadow-lg backdrop-blur-lg",
        "bg-gray-200/70 dark:bg-gray-700/70 dark:hover:bg-gray-700/60 hover:bg-gray-200/60",
        "transition-all duration-300 ease-in-out",
        "transform-gpu",
        isScrolled ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0",
        "hover:scale-105 active:scale-95",
        className
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      {...props}
    >
      <IconArrowUp className="size-6 dark:fill-white" />
    </Button>
  );
}