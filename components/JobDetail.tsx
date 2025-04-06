"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiEdit } from "react-icons/ci";
import JobEntry from "./JobEntry";

type Job = {
  jobNo: string;
  customerName: string;
  mobileNumber: string;
  deviceModel: string;
  issueDescription: string;
  estimatedCost: number;
};

type JobDetailProps = {
  job: Job;
};

export function JobDetail({ job }: JobDetailProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-white p-0">
          <CiEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-gray-800">
        <DialogHeader>
          <DialogTitle>Edit Job - {job.jobNo}</DialogTitle>
          <DialogDescription>
            Modify job details below and save changes.
          </DialogDescription>
        </DialogHeader>
        <JobEntry job ={job} />
      </DialogContent>
    </Dialog>
  );
}
