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
import AddJob from "./AddJob";

type Job = {
  _id: string;
  slno: number;
  name: string;
  mobile: string;
  brand: string;
  modelName: string;
  issue: string;
  cost: number;
  reminder: number;
  remarks: string;
  engineer: string;
  status: string;
};

type JobDetailProps = {
  job: Job;
};

export function JobDetail({ job }: JobDetailProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-min bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer">
          <CiEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-2xl bg-gray-800 text-white my-2">
        <DialogHeader>
          <DialogTitle>Edit Job Details - {job.slno}</DialogTitle>
          <DialogDescription>
            Modify job details below and save changes.
          </DialogDescription>
        </DialogHeader>
        <AddJob job={job} />
      </DialogContent>
    </Dialog>
  );
}
