import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RevenueTrendChart = ({ data }: any) => {
  console.log("revenueTrendData", data);

  return (
    <ResponsiveContainer width="100%" height={250} className="text-black">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="formatted_date" stroke="#00c49f" />
        <YAxis stroke="#00c49f" />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#00c49f" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>

  )
}

export default RevenueTrendChart