"use client";

import { useState, useEffect } from "react";
import PieChart from "./PieChart";

export default function JobReportDiagram() {
  const [statusChart, setStatusChart] = useState({
    labels: [],
    values: [],
    colors: [],
  });

  const [reportChart, setReportChart] = useState({
    labels: [],
    values: [],
    colors: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/admin");
      const data = await response.json();
      setStatusChart({
        labels: data.labels || ["OK", "Not OK", "Pending"],
        values: data.values || [data.okJobs, data.notOkJobs, data.pendingJobs],
        colors: data.colors || ["#FF6384", "#36A2EB", "#72f612"],
      });
      setReportChart({
        labels: data.labels || ["Successfull", "Failed", "Waiting Results"],
        values: data.values || [
          data.successfullJobs,
          data.failedJobs,
          data.waitingResults,
        ],
        colors: data.colors || ["#F59E0B", "#10B981", "#3B82F6"],
      });
    };
    fetchData();
  }, []);

  return (
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Report At a glance</h2>
      <div className="flex justify-between">
        <PieChart data={statusChart} />
        <PieChart data={reportChart} />
      </div>
    </div>
  );
}
