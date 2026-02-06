import { ThemeState } from "@/types"
import { create } from "zustand"

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false, // default
  toggleDarkMode: () =>
    set(({ darkMode }) => {
      const newMode = !darkMode
      document.documentElement.classList.toggle("dark", newMode)
      localStorage.setItem("theme", newMode ? "dark" : "light")
      return { darkMode: newMode }
    })
}))

// export const useThemeStore = create<ThemeState>((set) => ({
//   // darkMode: localStorage.getItem("theme") === "dark",
//   darkMode: localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches),
//   toggleDarkMode: () =>
//     set(({ darkMode }) => {
//       const newMode = !darkMode
//       document.documentElement.classList.toggle("dark", newMode)
//       localStorage.setItem("theme", newMode ? "dark" : "light")
//       return { darkMode: newMode }
//     })
// }))