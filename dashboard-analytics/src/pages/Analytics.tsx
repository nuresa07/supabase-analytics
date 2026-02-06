import Card from "@/component/Card"
import DatePicker from "@/component/DatePicker"
import Heading from "@/component/Heading"
import Select from "@/component/Select"
import { selectOption } from "@/constants"
import { useThemeStore } from "@/stores/ThemeStore"
import React, { Suspense, useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { fetchAnalytics } from "@/redux/slices/analyticsSlice"
import { parse } from "date-fns"
import { exportToCSV } from "@/utils/exportToCSV"
import { Link } from "react-router-dom"

const ActiveUsersChart = React.lazy(() => import("@/component/ActiveUsersChart"))
const ConversionRateChart = React.lazy(() => import("@/component/ConversionRateChart"))
const RevenueGrowthChart = React.lazy(() => import("@/component/RevenueGrowthChart"))
const RevenueTrendChart = React.lazy(() => import("@/component/RevenueTrendChart"))
const SessionDurationChart = React.lazy(() => import("@/component/SessionDurationChart"))
const UserGrowthChart = React.lazy(() => import("@/component/UserGrowthChart"))


const Analytics = () => {
  const { darkMode } = useThemeStore()

  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.analytics)
  // console.log("Analytics Data:", data);

  const [dateRange, setDateRange] = useState<{
    from: Date | null
    to: Date | null
  }>({
    from: null,
    to: null,
  })

  const [metric, setMetric] = useState("userGrowth")
  const [filteredData, setFilteredData] = useState(data)
  // console.log("Filtered Data:", filteredData);

  useEffect(() => {
    dispatch(fetchAnalytics())
  }, [dispatch])

  useEffect(() => {
    if (!data || !data.length) return

    const filtered = data.filter((item: any) => {
      // 1. const itemDate = new Date(item.date)
      // 2. const itemDate = parse(item.formatted_date, "MMM dd", new Date())
      const itemDate = item.date
        ? new Date(item.date)
        : parse(item.formatted_date, "MMM dd", new Date());
      console.log("Item Date:", itemDate);
      const isInRange =
        (!dateRange.from || itemDate >= dateRange.from) &&
        (!dateRange.to || itemDate <= dateRange.to)

      return isInRange
    })

    setFilteredData(filtered)
  }, [dateRange, data, metric])

  return (
    <div className="space-y-6">
      <Heading title="Analytics Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardStatistik title="Total Users" value="12,345" description="+5% this month" icon="👥" />
        <CardStatistik title="Revenue" value="$23,456" description="+12% this month" icon="💰" />
        <CardStatistik title="Avg. Session Duration" value="4m 32s" description="↓ 2% this week" icon="⏳" />
        <CardStatistik title="Conversion Rate" value="3.8%" description="↑ 1.5% this week" icon="📈" />
      </div>

      <button className="bg-green-500 text-white px-4 py-2 mr-4 rounded-lg shadow-md hover:bg-green-600 transition-colors cursor-pointer"
        onClick={() => exportToCSV(filteredData)}
      >
        Export CSV
      </button>

      <Link to="/analytics/add">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Tambah Data
        </button>
      </Link>

      {/* Filter Section */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4`}>
        <DatePicker
          value={dateRange}
          onChange={setDateRange}
          label="Select Date Range"
        />
        <Select
          options={selectOption}
          value={metric}
          onChange={setMetric}
          label="Select Metric"
        />
      </div>

      {/* Grafik detail */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Suspense fallback={<p>Loading Chart...</p>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metric === "userGrowth" && (
              <Card title="User Growth (Detail)" darkMode={darkMode}>
                <UserGrowthChart data={filteredData} />
              </Card>
            )}

            {metric === "revenueTrend" && (
              <Card title="Revenue Trend (Detail)" darkMode={darkMode}>
                <RevenueTrendChart data={filteredData} />
              </Card>
            )}

            {metric === "sessionDuration" && (
              <Card title="Session Duration (Detail)" darkMode={darkMode}>
                <SessionDurationChart data={filteredData} />
              </Card>
            )}

            {metric === "conversionRate" && (
              <Card title="Conversion Rate" darkMode={darkMode}>
                <ConversionRateChart data={filteredData} />
              </Card>
            )}

            {metric === "activeUsers" && (
              <Card title="Active Users (Detail)" darkMode={darkMode}>
                <ActiveUsersChart data={filteredData} />
              </Card>
            )}

            {metric === "revenueGrowth" && (
              <Card title="Revenue Growth (%)" darkMode={darkMode}>
                <RevenueGrowthChart data={filteredData} />
              </Card>
            )}
          </div>
        </Suspense>
      )}
    </div>
  )
}

export const CardStatistik = ({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description?: string
  icon: string
}) => {
  const { darkMode } = useThemeStore()

  return (
    <div
      className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        } p-3 rounded-lg shadow-md border transition-transform transform hover:scale-105 hover:shadow-xl items-center`}
    >
      <div className="flex items-center space-x-2 h-full">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      </div>
    </div>
  )
}

export default Analytics;