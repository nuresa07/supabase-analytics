// import { useThemeStore } from "@/stores/ThemeStore"
import { DatePickerProps } from "@/types"

import { DateRangePicker } from "react-date-range";
import { enGB } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// pemilih tanggal
const DatePicker = ({ value, onChange, label }: DatePickerProps) => {

  // const { darkMode } = useThemeStore()

  return (
    <div className={`flex flex-col overflow-x-auto`}>
      {label && <label className={`text-sm font-medium mb-1`}>{label}</label>}
      <DateRangePicker
        className={`text-black `}
        locale={enGB}
        ranges={[
          {
            startDate: value.from ?? undefined,
            endDate: value.to ?? undefined,
            key: "selection"
          }
        ]}
        onChange={(ranges) => onChange({
          from: ranges.selection.startDate || null,
          to: ranges.selection.endDate || null
        })}
      />
    </div>
  )
}

export default DatePicker