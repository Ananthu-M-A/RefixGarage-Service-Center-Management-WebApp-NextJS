import React from "react";
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
  jobNo: string;
  deviceModel: string;
  issue: string;
  status: string;
  advancePaid: number;
};

const mockJobs: Job[] = [
  {
    jobNo: "JOB000001",
    deviceModel: "Apple iPhone 13",
    issue: "Display damage",
    status: "Job Started",
    advancePaid: 250.0,
  },
];

function JobsTable() {
  return (
    <>
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>
        <Table>
          <TableCaption>
            {mockJobs.length > 0
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
            {mockJobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{job.jobNo}</TableCell>
                <TableCell>{job.deviceModel}</TableCell>
                <TableCell>{job.issue}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell className="text-right">
                  ₹{job.advancePaid.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <JobDetail
                    job={{
                      jobNo: "JOB000001",
                      customerName: "Jane Smith",
                      mobileNumber: "9876543210",
                      deviceModel: "iPhone 13",
                      issueDescription: "Display damage",
                      estimatedCost: 250,
                      reminder: 5,  
                      remarks: "Customer is in a hurry",
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
