"use client";

import { useState, useEffect } from "react";
import PieChart from "./PieChart";
import Loading from "@/app/loading";

export default function JobStatusDiagram() {
  const [chartData, setChartData] = useState({
    labels: [],
    values: [],
    colors: [],
  });
  const [jobData, setJobData] = useState({
    okJobs: 0,
    notOkJobs: 0,
    pendingJobs: 0,
    totalJobs: 0,
    deliveredJobs: 0,
    successfullJobs: 0,
    failedJobs: 0,
    receptionists: 0,
    engineers: 0,
    revenue: 0,
    expense: 0,
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
      setJobData(data);
    };
    fetchData();
  }, []);

  if (!chartData.labels.length) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-4xl text-white bg-gray-800 p-6 rounded-lg shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Job Status At a Glance
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2">
            <PieChart data={chartData} />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
              Job Status Data
            </h3>
            <div className="flex flex-col gap-4">
              <ul className="list-disc pl-5">
                {chartData.labels.map((label, index) => (
                  <li key={index} className="font-semibold text-gray-300">
                    {label}: {chartData.values[index]}
                  </li>
                ))}
                <li className="font-semibold text-gray-300">
                  Total : {jobData.totalJobs}
                </li>
                <li className="font-semibold text-gray-300">
                  Delivered: {jobData.deliveredJobs}
                </li>
                <li className="font-semibold text-gray-300">
                  Successful: {jobData.successfullJobs}
                </li>
                <li className="font-semibold text-gray-300">
                  Failed: {jobData.failedJobs}
                </li>
              </ul>
              <ul className="list-disc pl-5">
                <li className="font-semibold text-gray-300">
                  Engineers: {jobData.engineers}
                </li>
                <li className="font-semibold text-gray-300">
                  Receptionists: {jobData.receptionists}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
