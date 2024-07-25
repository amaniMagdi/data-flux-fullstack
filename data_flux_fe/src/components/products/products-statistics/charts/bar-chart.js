import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Bar Chart Component for Mean, Median, Mode
const BarChartComponent = ({statistics}) => {

  const data = [
    {
      name: "Mean",
      price: statistics.mean.price,
      rating: statistics.mean.rating,
      stock_quantity: statistics.mean.stock_quantity,
    },
    {
      name: "Median",
      price: statistics.median.price,
      rating: statistics.median.rating,
      stock_quantity: statistics.median.stock_quantity,
    },
    {
      name: "Mode",
      price: statistics.mode.price,
      rating: statistics.mode.rating,
      stock_quantity: statistics.mode.stock_quantity,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8" />
        <Bar dataKey="rating" fill="#82ca9d" />
        <Bar dataKey="stock_quantity" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
