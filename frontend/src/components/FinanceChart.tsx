import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type Props = {
  data: any[];
};

export const FinanceChart = ({ data }: Props) => {
  return (
    <div className="bg-zinc-900 p-5 rounded-xl">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
          />

          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
          />

          <CartesianGrid stroke="#444" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};