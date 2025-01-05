"use client"

import { ThemeProvider as NextThemeProvider } from 'next-themes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ThemeProvider(props: any) {
  return <NextThemeProvider {...props} />;
}
