// import { userGrowthChartData } from "@/constants"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const UserGrowthChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={250} className="text-black">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="formatted_date" stroke="#8884d8" />
        <YAxis stroke="#8884d8" />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default UserGrowthChart