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

function JobsTable() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Jobs</h1>
        <Table>
          <TableCaption>A list of your recent jobs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Job No</TableHead>
              <TableHead>Device Model</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Job Status</TableHead>
              <TableHead className="text-right">Advance Paid</TableHead>
              <TableHead className="text-right">Edit Job</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">JOB000001</TableCell>
              <TableCell>Apple Iphone 13</TableCell>
              <TableCell>Display damage</TableCell>
              <TableCell>Job Started</TableCell>
              <TableCell className="text-right">₹250.00</TableCell>
              <TableCell className="text-right">
                <JobDetail />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default JobsTable;
