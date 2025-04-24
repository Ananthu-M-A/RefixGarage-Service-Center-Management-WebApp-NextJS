"use client";

import React, { useState, useEffect } from "react";
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
import { showErrorToast } from "@/lib/toast";

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

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

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
        showErrorToast("Failed to fetch jobs.");
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load job data. Please try again later.");
    }
  };

  const handleSort = (order: string) => {
    const sortedJobs = [...filteredJobs].sort((a, b) => {
      if (order === "asc") {
        return a.device.localeCompare(b.device);
      } else {
        return b.device.localeCompare(a.device);
      }
    });
    setFilteredJobs(sortedJobs);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = jobs.filter(
      (job) =>
        job.device.toLowerCase().includes(searchTerm) ||
        job.issue.toLowerCase().includes(searchTerm) ||
        job.customerId.name.toLowerCase().includes(searchTerm)
    );
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    if (value === "all") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) => job.status === value);
      setFilteredJobs(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-4">Jobs</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex items-center justify-between mb-4">
          <Select defaultValue="all" onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[120px] bg-gray-800 font-semibold text-white">
              <SelectValue placeholder="Filtered by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectGroup>
                <SelectLabel>Jobs</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="ok">OK</SelectItem>
                <SelectItem value="notok">Not OK</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
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
            {filteredJobs.length === 0 && "No jobs available at the moment."}
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
            {currentJobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {indexOfFirstJob + index + 1}
                </TableCell>
                <TableCell>{job.device}</TableCell>
                <TableCell>{job.issue}</TableCell>
                <TableCell>{job.status.toLocaleUpperCase()}</TableCell>
                <TableCell className="text-right">
                  ₹{job.cost.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <JobDetail
                    job={{
                      slno: indexOfFirstJob + index + 1,
                      _id: job._id,
                      name: job.customerId.name,
                      mobile: job.customerId.mobile,
                      device: job.device,
                      issue: job.issue,
                      reminder: job.reminder,
                      remarks: job.remarks,
                      cost: job.cost,
                      engineer: job.engineer,
                      status: job.status,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-gray-700 text-white"
                  : "bg-gray-900 text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Jobs;
