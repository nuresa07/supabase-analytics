import { useThemeStore } from "@/stores/ThemeStore"
import { SelectProps } from "@/types"

const Select = ({ options, value, onChange, label }: SelectProps) => {

  const { darkMode } = useThemeStore()

  return (
    <div className="flex flex-col">
      {label && <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{label}</label>}
      <select className={`p-2 border rounded-md ${darkMode ? "bg-gray-700 text-white" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select