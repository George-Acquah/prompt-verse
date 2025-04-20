"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";
type _TProviderProps = ThemeProviderProps;

export default function Providers({ children, ...props }: _TProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      disableTransitionOnChange
    >
       {children}
    </NextThemesProvider>
  );
}
