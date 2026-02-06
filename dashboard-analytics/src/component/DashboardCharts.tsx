import { activeUsersData, sessionDurationData } from "@/constants";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { memo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";


const DashboardCharts = ({ darkMode }: { darkMode: boolean }) => {

  const { users, revenue } = useSelector((state: RootState) => state.chart);
  //   const {
  //   users,
  //   revenue,
  //   session_duration,
  //   active_users,
  // } = useSelector((state: RootState) => state.chart);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {/* User Growth */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} border border-blue-500 p-4 rounded-lg shadow-lg`}>
        <h2 className="text-lg font-semibold mb-2">User Growth</h2>
        <ResponsiveContainer width="100%" height={300} className="text-black">
          <LineChart data={users.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#0000FF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue trend */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-4 rounded-lg shadow-lg border border-[#82ca9d]`}>
        <h2 className="text-lg font-semibold mb-2">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300} className="text-black">
          <LineChart data={revenue.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Session Duration */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-4 rounded-lg shadow-lg border border-[#ffc658]`}>
        <h2 className="text-lg font-semibold mb-2">Session Duration (mins)</h2>
        <ResponsiveContainer width="100%" height={300} className="text-black">
          <BarChart data={sessionDurationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duration" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* active users */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-4 rounded-lg shadow-lg border border-[#ff7300]`}>
        <h2 className="text-lg font-semibold mb-2">Active Users</h2>
        <ResponsiveContainer width="100%" height={300} className="text-black">
          <BarChart data={activeUsersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default memo(DashboardCharts)

{/* <BarChart data={session_duration?.data || []}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="value" fill="#ffc658" />
</BarChart> */}

{/* <BarChart data={active_users?.data || []}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="value" fill="#ff7300" />
</BarChart> */}