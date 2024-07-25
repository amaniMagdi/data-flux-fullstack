import React from "react";
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend, ResponsiveContainer } from "recharts";

const PieChartComponent = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF3D67"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="70%"
          fill="#8884d8"
          labelLine={false} // Disable lines
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <PieTooltip />
        <PieLegend layout="vertical" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
