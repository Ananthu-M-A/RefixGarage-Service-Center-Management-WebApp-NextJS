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
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Status At a glance</h2>
        <PieChart data={chartData} />
    </div>
  );
}
