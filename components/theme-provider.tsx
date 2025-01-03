"use client"

import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider(props: any) {
  return <NextThemeProvider {...props} />;
}
