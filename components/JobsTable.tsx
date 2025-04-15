"use client";

import React, { useEffect } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobDetail } from "./JobDetail";
import { Input } from "./ui/input";

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
    fetchJobs();
  }, []);

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

  const handleSort = (order: string) => {
    const sortedJobs = [...jobs].sort((a, b) => {
      if (order === "asc") {
        return a.device.localeCompare(b.device);
      } else {
        return b.device.localeCompare(a.device);
      }
    });
    setJobs(sortedJobs);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredJobs = jobs.filter(
      (job) =>
        job.device.toLowerCase().includes(searchTerm) ||
        job.issue.toLowerCase().includes(searchTerm) ||
        job.customerId.name.toLowerCase().includes(searchTerm)
    );
    setJobs(filteredJobs);
  };

  const handleFilterChange = (value: string) => {
    if (value === "all-jobs") {
      fetchJobs();
    } else {
      const filteredJobs = jobs.filter((job) => job.status === value);
      setJobs(filteredJobs);
    }
  };

  return (
    <>
      <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Jobs</h2>
        <div className="flex items-center justify-between mb-4">
          <Select defaultValue="all-jobs" onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[120px] bg-gray-800 font-semibold text-white">
              <SelectValue placeholder="Filtered by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectGroup>
                <SelectLabel>Jobs</SelectLabel>
                <SelectItem value="all-jobs">All</SelectItem>
                <SelectItem value="ok-jobs">OK</SelectItem>
                <SelectItem value="not-ok-jobs">Not OK</SelectItem>
                <SelectItem value="pending-jobs">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            <Input
              placeholder="Search jobs..."
              name="search"
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Sort by:</span>
            <AiOutlineSortAscending
              className="text-white bg-gray-900"
              size={20}
              onClick={() => handleSort("asc")}
            />
            <AiOutlineSortDescending
              className="text-white bg-gray-900"
              size={20}
              onClick={() => handleSort("desc")}
            />
          </div>
        </div>
        <Table>
          <TableCaption>
            {jobs.length > 0
              ? "A list of your recent jobs."
              : "No jobs available at the moment."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] text-gray-400">Job No</TableHead>
              <TableHead className="text-gray-400">Device Model</TableHead>
              <TableHead className="text-gray-400">Issue</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-right text-gray-400">
                Advance Paid
              </TableHead>
              <TableHead className="text-right text-gray-400">Edit</TableHead>
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
                      engineer: job.engineer,
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
