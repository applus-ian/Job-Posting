"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Our existing data
const chartData = [
  { month: "JAN", value: 4000 },
  { month: "FEB", value: 500 },
  { month: "MAR", value: 1150 },
  { month: "APR", value: 400 },
  { month: "JUN", value: 1900 },
  { month: "JUL", value: 900 },
  { month: "AUG", value: 1800 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-md rounded-md text-xs">
        <p className="font-medium text-gray-700">{label}</p>
        <div className="flex items-center gap-1 mt-1">
          <div className="w-2 h-2 bg-orange-500 rounded-sm"></div>
          <p className="text-xs">
            Applications{" "}
            <span className="font-semibold ml-1">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function ApplicationChart() {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-xs text-gray-500">Applications this Year (2025)</h4>
          <p className="text-xl font-semibold mt-0.5">1,150</p>
        </div>
        <div className="flex items-center px-1.5 py-0.5 rounded-md bg-green-50">
          <span className="text-xs text-green-600 font-medium">+12%</span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                tickFormatter={(value) => `${value / 1000}k`}
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                tick={{ fontSize: 10 }}
                orientation="left"
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f97316"
                strokeWidth={2}
                dot={{
                  r: 3,
                  fill: "#f97316",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 4,
                  fill: "#f97316",
                  strokeWidth: 1,
                  stroke: "white",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
