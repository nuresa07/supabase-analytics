import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SessionDurationChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={250} className="text-black">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="formatted_date" stroke="#ffbb28" />
        <YAxis stroke="#ffbb28" />
        <Tooltip />
        <Bar dataKey="session_duration" fill="#ffbb28" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SessionDurationChart;
