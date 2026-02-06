import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RevenueGrowthChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={250} className="text-black">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="formatted_date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Area type="monotone" dataKey="revenue_growth" stroke="#ff7300" fill="#ff7300" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueGrowthChart;
