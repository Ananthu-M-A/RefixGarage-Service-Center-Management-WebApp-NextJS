"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobDetail } from "./JobDetail";

type Job = {
  customerId: {
    name: string;
    mobile: string;
  };
  _id: string;
  reminder: number;
  remarks: string;
  device: string;
  issue: string;
  status: string;
  cost: number;
  engineer: string;
};

function JobsTable() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/reception/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobs = await response.json();
        setJobs(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Jobs</h2>
        <Table>
          <TableCaption>
            {jobs.length > 0
              ? "A list of your recent jobs."
              : "No jobs available at the moment."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Job No</TableHead>
              <TableHead>Device Model</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Advance Paid</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{job.device}</TableCell>
                <TableCell>{job.issue}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell className="text-right">
                  ₹{job.cost.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <JobDetail
                    job={{
                      slno: index + 1,
                      _id: job._id,
                      name: job.customerId.name,
                      mobile: job.customerId.mobile,
                      device: job.device,
                      issue: job.issue,
                      reminder: job.reminder,
                      remarks: job.remarks,
                      cost: job.cost,
                      engineer: job.engineer
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default JobsTable;
