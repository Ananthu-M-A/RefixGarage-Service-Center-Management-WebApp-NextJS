"use client";

import React, { useEffect, useState } from "react";
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
import { SMARTPHONE_BRANDS } from "@/constants/brands";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Customer name must be at least 2 characters." }),
  mobile: z
    .string()
    .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  brand: z.string().min(2, { message: "Brand must be at least 2 characters." }),
  modelName: z
    .string()
    .min(2, { message: "Device model must be at least 2 characters." }),
  issue: z
    .string()
    .min(2, { message: "Issue description must be at least 2 characters." }),
  remarks: z
    .string()
    .min(2, { message: "Remarks must be at least 2 characters." }),
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
  isDelivered: z
    .string()
    .min(2, { message: "Delivery status must be at least 2 characters." }),
});

type JobFormData = z.infer<typeof formSchema> & {
  _id?: string;
};
type JobEntryProps = {
  job?: JobFormData;
};

function AddJob({ job }: JobEntryProps) {
  const [engineers, setEngineers] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<JobFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: job ?? {
      name: "",
      mobile: "",
      brand: "",
      modelName: "",
      issue: "",
      remarks: "",
      cost: 0,
      reminder: 0,
      engineer: "",
      status: "Pending",
      isDelivered: "No",
    },
  });

  const onSubmit = (data: JobFormData) => {
    if (loading) return;
    setLoading(true);

    if (job) {
      const updateJob = async () => {
        const response = await fetch(`/api/reception/jobs/${job._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        setLoading(false);
        if (response.ok) {
          showSuccessToast("Job updated successfully!");
          window.location.reload();
        } else {
          const error = await response.json();
          showErrorToast(error.message);
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
        setLoading(false);
        if (response.ok) {
          showSuccessToast("Job created successfully!");
          window.location.reload();
        } else {
          const error = await response.json();
          showErrorToast(error.message);
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
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {job ? "Edit Job Details" : "New Job Entry"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        className="bg-gray-900 text-white"
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
                        className="bg-gray-900 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!!job}
                      >
                        <SelectTrigger className="w-full bg-gray-900 text-white hover:cursor-pointer">
                          <SelectValue placeholder="Select Brand" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white">
                          {SMARTPHONE_BRANDS.map((brand, index) => (
                            <SelectItem key={index} value={brand}>
                              {brand}
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
                name="modelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg:- 13 Pro Max"
                        {...field}
                        disabled={!!job}
                        className="bg-gray-900 text-white"
                      />
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
                      <Select
                        onValueChange={field.onChange}
                        value={!job ? field.value : job.engineer}
                        disabled={
                          job?.status === "ok" || job?.status === "notok"
                        }
                      >
                        <SelectTrigger className="w-full bg-gray-900 text-white hover:cursor-pointer">
                          <SelectValue placeholder="Select Engineer" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white">
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
                      <Input
                        type="number"
                        placeholder="Eg:- 2"
                        {...field}
                        disabled={
                          job?.status === "ok" || job?.status === "notok"
                        }
                        className="bg-gray-900 text-white"
                        onFocus={(e) => {
                          if (e.target.value === "0") {
                            e.target.value = "";
                            field.onChange("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="bg-gray-900 text-white"
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
                    <FormLabel>Remarks / Solution</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Eg:- Customer requested for a quick fix."
                        {...field}
                        disabled={
                          job?.status === "ok" || job?.status === "notok"
                        }
                        className="bg-gray-900 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Cost</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Eg:- 5000"
                        {...field}
                        disabled={job?.isDelivered === "Yes"}
                        className="bg-gray-900 text-white"
                        onFocus={(e) => {
                          if (e.target.value === "0") {
                            e.target.value = "";
                            field.onChange("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {job && job.status === "pending" && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={!job ? "pending" : field.value}
                          disabled={
                            !job ||
                            job.status === "ok" ||
                            job.status === "notok"
                          }
                        >
                          <SelectTrigger className="w-full bg-gray-900 text-white hover:cursor-pointer">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 text-white">
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
              )}
              {job && job.status !== "pending" && (
                <FormField
                  control={form.control}
                  name="isDelivered"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivered</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={!job ? "No" : field.value}
                          disabled={job?.isDelivered === "Yes"}
                        >
                          <SelectTrigger className="w-full bg-gray-900 text-white hover:cursor-pointer">
                            <SelectValue placeholder="Change Delivery Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 text-white">
                            <SelectItem
                              className="hover:bg-white hover:text-black"
                              value={"Yes"}
                            >
                              Yes
                            </SelectItem>
                            <SelectItem
                              className="hover:bg-white hover:text-black"
                              value={"No"}
                            >
                              No
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
              disabled={loading || job?.isDelivered === "Yes"}
            >
              {loading ? "Processing..." : job ? "Update Job" : "Submit Job"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default AddJob;
