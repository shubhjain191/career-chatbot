import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle Theme"
      className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 shadow hover:from-blue-200 hover:to-indigo-200 transition-all duration-200"
    >
      <span className="absolute inset-0 flex items-center justify-center">
        <Sun className={`w-6 h-6 text-yellow-500 transition-all duration-300 ${theme === "light" ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
        <Moon className={`w-6 h-6 text-indigo-600 transition-all duration-300 ${theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
      </span>
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}