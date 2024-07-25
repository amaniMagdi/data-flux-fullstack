import React, { useState, useEffect } from "react";
import http from "../../axios/axios";
import BarChartComponent from "./charts/bar-chart";
import PieChartComponent from "./charts/pie-chart";
import "./statistics.css"

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [quartilesData, setQuartilesData] = useState([]);

  useEffect(() => {
    http
      .get("/tabular/statistics")
      .then((response) => {
        setStatistics(response.data);
        setQuartilesData([
          { name: "Q1 Price", value: response.data.quartiles.price["0.25"] },
          { name: "Q2 Price", value: response.data.quartiles.price["0.5"] },
          { name: "Q3 Price", value: response.data.quartiles.price["0.75"] },
          { name: "Q1 Rating", value: response.data.quartiles.rating["0.25"] },
          { name: "Q2 Rating", value: response.data.quartiles.rating["0.5"] },
          { name: "Q3 Rating", value: response.data.quartiles.rating["0.75"] },
          {
            name: "Q1 Stock",
            value: response.data.quartiles.stock_quantity["0.25"],
          },
          {
            name: "Q2 Stock",
            value: response.data.quartiles.stock_quantity["0.5"],
          },
          {
            name: "Q3 Stock",
            value: response.data.quartiles.stock_quantity["0.75"],
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching the statistics:", error);
      });
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }} className="charts-container">
        <div className="chart-box"
                  >
          <h3>Mean, Median, Mode</h3>
          {statistics ? (
            <BarChartComponent statistics={statistics} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="chart-box">
          <h3>Quartiles and Outliers</h3>
          {quartilesData ? (
            <PieChartComponent data={quartilesData} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
