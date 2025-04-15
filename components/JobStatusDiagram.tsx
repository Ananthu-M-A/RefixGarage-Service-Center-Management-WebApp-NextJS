"use client";

import { useState, useEffect } from "react";
import PieChart from "./PieChart";

export default function JobStatusDiagram() {
  const [chartData, setChartData] = useState({
    labels: [],
    values: [],
    colors: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/admin");
      const data = await response.json();
      setChartData({
        labels: data.labels || ["OK", "Not OK", "Pending"],
        values: data.values || [data.okJobs, data.notOkJobs, data.pendingJobs],
        colors: data.colors || ["#FF6384", "#36A2EB", "#72f612"],
      });
    };
    fetchData();
  }, []);

  return (
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md mb-20">
      <h2 className="text-2xl font-bold mb-4">Job Status At a Glance</h2>
      <PieChart data={chartData} />
      <h3 className="text-xl font-semibold my-2">Job Status Data</h3>
      <div className="flex gap-6 mt-4">
        <ul className="list-disc pl-5">
          {chartData.labels.map((label, index) => (
            <li key={index} className="font-semibold text-gray-300">
              {label}: {chartData.values[index]}
            </li>
          ))}
        </ul>
        <ul className="list-disc pl-5">
          <li className="font-semibold text-gray-300">
            Total Jobs: {chartData.values.reduce((a, b) => a + b, 0)}
          </li>
          <li className="font-semibold text-gray-300">Engineers: 1</li>
        </ul>
      </div>
    </div>
  );
}
