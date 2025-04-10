"use client";

import React from "react";
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
});

type JobFormData = z.infer<typeof formSchema> & {
  _id?: string;
};
type JobEntryProps = {
  job?: JobFormData;
};

function JobEntry({ job }: JobEntryProps) {
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
    },
  });

  const onSubmit = (data: JobFormData) => {
    if (job) {
      const updateJob = async () => {
        const response = await fetch(`/api/reception/${job._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log("Job updated successfully!");
        } else {
          console.error("Failed to update job.");
        }
      };
      updateJob();
    } else {
      const createJob = async () => {
        const response = await fetch("/api/reception", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log("Job created successfully!");
        } else {
          console.error("Failed to create job.");
        }
      };
      createJob();
    }
  };

  return (
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
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
                      placeholder="Irfan Shas"
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
                      placeholder="6238899623"
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
                      placeholder="iPhone 13 Pro"
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
                    <Input
                      type="number"
                      placeholder="Enter estimated cost"
                      {...field}
                    />
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
                    <Input
                      type="number"
                      placeholder="Enter reminder time in days"
                      {...field}
                    />
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
                    placeholder="Describe the issue with the device"
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
                    placeholder="Additional remarks or comments"
                    {...field}
                  />
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

export default JobEntry;
