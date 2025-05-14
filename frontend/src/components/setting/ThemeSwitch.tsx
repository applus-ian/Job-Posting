"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className="space-y-4 dark:text-white">
      <div>
        <h2 className="text-xl font-semibold">Theme</h2>
        <p className="text-sm text-muted-foreground">Select the theme for the display.</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Light Theme Option */}
        <div className="space-y-2">
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "relative overflow-hidden rounded-lg border-2 p-1 transition-all",
              theme === "light" ? "border-primary" : "border-border hover:border-primary/50"
            )}
            aria-label="Light theme"
          >
            <div className="h-[100px] w-[150px] rounded bg-white p-3">
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                </div>
              </div>
            </div>
          </button>
          <p className="text-center text-sm font-medium">Light</p>
        </div>

        {/* Dark Theme Option */}
        <div className="space-y-2">
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "relative overflow-hidden rounded-lg border-2 p-1 transition-all",
              theme === "dark" ? "border-primary" : "border-border hover:border-primary/50"
            )}
            aria-label="Dark theme"
          >
            <div className="h-[100px] w-[150px] rounded bg-slate-900 p-3">
              <div className="h-4 w-3/4 rounded bg-slate-700" />
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-slate-700" />
                  <div className="h-4 w-2/3 rounded bg-slate-700" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-slate-700" />
                  <div className="h-4 w-2/3 rounded bg-slate-700" />
                </div>
              </div>
            </div>
          </button>
          <p className="text-center text-sm font-medium">Dark</p>
        </div>
      </div>
    </div>
  );
}
