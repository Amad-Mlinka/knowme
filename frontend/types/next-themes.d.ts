declare module "next-themes" {
  import * as React from "react";

  export interface ThemeProviderProps {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
  }

  export const ThemeProvider: React.FC<ThemeProviderProps>;

  export function useTheme(): {
    theme?: string;
    resolvedTheme?: string;
    setTheme: (theme: string) => void;
  };
} 