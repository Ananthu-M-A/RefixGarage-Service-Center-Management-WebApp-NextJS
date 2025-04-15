"use client";

import { useState, useEffect } from "react";
import PieChart from "./PieChart";
import { Button } from "./ui/button";

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
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md mb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Job Report At a glance</h2>
        <Button className="text-lg pb-3 font-semibold mb-4">
          Download Report
        </Button>
      </div>
      <div className="flex justify-between">
        <PieChart data={statusChart} />
        <PieChart data={reportChart} />
      </div>
      <h3 className="text-xl font-semibold my-2">Chart Data</h3>
      <div className="flex gap-6 mt-4">
        <ul className="list-disc pl-5">
          {statusChart.labels.map((label, index) => (
            <li key={index} className="text-gray-300">
              {label}: {statusChart.values[index]}
            </li>
          ))}
        </ul>
        <ul className="list-disc pl-5">
          {reportChart.labels.map((label, index) => (
            <li key={index} className="text-gray-300">
              {label}: {reportChart.values[index]}
            </li>
          ))}
        </ul>
        <ul className="list-disc pl-5">
          <li className="text-gray-300">
            Total Jobs: {statusChart.values.reduce((a, b) => a + b, 0)}
          </li>
          <li className="text-gray-300">Receptionists: 1</li>
          <li className="text-gray-300">Engineers: 1</li>
        </ul>
      </div>
    </div>
  );
}
