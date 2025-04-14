'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconArrowUp } from '@/components/ui/icons'
import { useScrollPosition } from '@/lib/hooks/use-scroll-position'

export function ButtonScrollToBottom({ className, ...props }: ButtonProps) {
  const { isAtTop } = useScrollPosition()

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'fixed right-4 bottom-10 z-10 bg-zinc-400 transition-opacity duration-300 sm:right-8 md:top-2',
        isAtTop ? 'opacity-0' : 'opacity-60',
        className
      )}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      {...props}
    >
      <IconArrowUp />
      <span className="sr-only">Scroll to Top</span>
    </Button>
  )
}
