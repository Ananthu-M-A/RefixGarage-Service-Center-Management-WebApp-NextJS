"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Customer name must be at least 2 characters." }),
  mobile: z
    .string()
    .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  device: z
    .string()
    .min(2, { message: "Device model must be at least 2 characters." }),
  issue: z
    .string()
    .min(5, { message: "Issue description must be at least 5 characters." }),
  remarks: z
    .string()
    .min(5, { message: "Remarks must be at least 5 characters." }),
  cost: z.coerce
    .number()
    .min(0, { message: "Estimated cost must be a positive number." }),
  reminder: z.coerce
    .number()
    .min(0, { message: "Reminder must be a positive number." }),
  engineer: z
    .string()
    .min(2, { message: "Engineer name must be at least 2 characters." }),
  status: z
    .string()
    .min(2, { message: "Status must be at least 2 characters." }),
});

type JobFormData = z.infer<typeof formSchema> & {
  _id?: string;
};
type JobEntryProps = {
  job?: JobFormData;
};

function AddJob({ job }: JobEntryProps) {
  const [engineers, setEngineers] = React.useState<{ name: string }[]>([]);
  const form = useForm<JobFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: job ?? {
      name: "",
      mobile: "",
      device: "",
      issue: "",
      remarks: "",
      cost: 0,
      reminder: 0,
      engineer: "",
      status: "Pending",
    },
  });

  const onSubmit = (data: JobFormData) => {
    if (job) {
      const updateJob = async () => {
        const response = await fetch(`/api/reception/jobs/${job._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          showSuccessToast("Job updated successfully!");
        } else {
          showErrorToast("Failed to update job.");
        }
      };
      updateJob();
    } else {
      const createJob = async () => {
        const response = await fetch("/api/reception/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          showSuccessToast("Job created successfully!");
        } else {
          showErrorToast("Failed to create job.");
        }
      };
      createJob();
    }
  };

  useEffect(() => {
    async function fetchEngineers() {
      const response = await fetch("/api/reception/jobs/new");
      if (response.ok) {
        const engineers = await response.json();
        setEngineers(engineers);
      } else {
        showErrorToast("Failed to fetch engineers.");
      }
    }
    fetchEngineers();
  }, []);

  return (
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md mb-20">
      <h2 className="text-2xl font-bold mb-4">
        {job ? "Edit Job" : "New Job Entry"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg:- Ananthu M A"
                      {...field}
                      disabled={!!job}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg:- 6238899623"
                      {...field}
                      disabled={!!job}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="device"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Model</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg:- iPhone 13 Pro"
                      {...field}
                      disabled={!!job}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Cost</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Eg:- 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="engineer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engineer</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Engineer" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white">
                        {engineers.map((engineer, index) => (
                          <SelectItem key={index} value={engineer.name}>
                            {engineer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reminder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remind me</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Eg:- 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="issue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Eg:- Display not working, battery issue, etc."
                    {...field}
                    disabled={!!job}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Eg:- Customer requested for a quick fix."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"pending"}
                    disabled={!job}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white">
                      <SelectItem
                        className="hover:bg-white hover:text-black"
                        value={"pending"}
                      >
                        Pending
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-white hover:text-black"
                        value={"ok"}
                      >
                        OK
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-white hover:text-black"
                        value={"notok"}
                      >
                        Not OK
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {job ? "Update Job" : "Submit Job"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddJob;
