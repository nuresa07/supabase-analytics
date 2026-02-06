import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ConversionRateChart = ({ data }: any) => {
  return (

    <ResponsiveContainer width="100%" height={300} className="text-black">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="formatted_date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="conversion_rate" stroke="#ff7300" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>

  );
};

export default ConversionRateChart