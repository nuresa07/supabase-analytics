import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ActiveUsersChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={250} className="text-black">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="formatted_date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Bar dataKey="active_users" fill="#ff5722" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActiveUsersChart;
