"use client";

import { useState, useEffect } from "react";
import PieChart from "./PieChart";

export default function Diagram() {
  const [chartData, setChartData] = useState({
    labels: [],
    values: [],
    colors: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/reception");
      const data = await response.json();
      console.log(data)
      setChartData({
        labels: data.labels || ["OK", "Not OK"],
        values: data.values || [data.okJobs, data.notOkJobs],
        colors: data.colors || ["#FF6384", "#36A2EB"],
      });
    };
    fetchData();
  }, []);

  return (
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">At a glance</h2>
        <PieChart data={chartData} />
    </div>
  );
}
