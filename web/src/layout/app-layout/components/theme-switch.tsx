"use client"

import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={(checked) =>
        setTheme(checked ? "dark" : "light")
      }
      checkedIcon={<Moon className="h-4 w-4" />}
      uncheckedIcon={<Sun className="h-4 w-4" />}
      size="lg"
    />
  )
}