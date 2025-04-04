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

// Schema
const formSchema = z.object({
  customerName: z.string().min(2, { message: "Customer name must be at least 2 characters." }),
  mobileNumber: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  deviceModel: z.string().min(2, { message: "Device model must be at least 2 characters." }),
  issueDescription: z.string().min(5, { message: "Issue description must be at least 5 characters." }),
  estimatedCost: z.number().min(0, { message: "Estimated cost must be a positive number." }),
});

type JobFormData = z.infer<typeof formSchema>;
type JobEntryProps = {
  job?: JobFormData;
};

function JobEntry({ job }: JobEntryProps) {
  const form = useForm<JobFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: job ?? {
      customerName: "",
      mobileNumber: "",
      deviceModel: "",
      issueDescription: "",
      estimatedCost: 0,
    },
  });

  const onSubmit = (data: JobFormData) => {
    if (job) {
      console.log("Editing Job:", data);
      // Send PATCH to /api/jobs/:id
    } else {
      console.log("Creating Job:", data);
      // Send POST to /api/jobs
    }
  };

  return (
    <div className="w-full text-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Model</FormLabel>
                  <FormControl>
                    <Input placeholder="iPhone 13 Pro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Cost</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter estimated cost" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="issueDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the issue with the device" {...field} />
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
