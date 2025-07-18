"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.scss";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid rendering different HTML than server
    return (
      <button className={styles.toggle} aria-label="Toggle theme" disabled />
    );
  }

  const current = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className={styles.toggle}
      aria-label="Toggle theme"
    >
      {current === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
} 