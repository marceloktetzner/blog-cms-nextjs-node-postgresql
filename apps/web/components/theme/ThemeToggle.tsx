"use client";

import { useEffect, useState } from "react";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      onClick={toggle}
      aria-label="Alternar tema"
      className="inline-flex items-center gap-2 rounded border border-border/50 bg-card/50 px-3 py-2 text-sm transition-all
                 hover:text-blue-600 dark:hover:text-red-400 hover:border-blue-500 dark:hover:border-red-500 hover:-translate-y-0.5
                 focus:outline-none focus:ring-2 focus:ring-ring/60"
    >
      <span className="text-lg leading-none">{theme === "dark" ? "☀️" : "🌙"}</span>
      <span className="hidden md:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
