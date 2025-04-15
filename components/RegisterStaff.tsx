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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Customer name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z
    .string()
    .min(2, { message: "Staff position must be at least 2 characters." }),
});

type StaffFormData = z.infer<typeof formSchema> & {
  _id?: string;
};

function RegisterStaff() {
  const form = useForm<StaffFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  const onSubmit = (data: StaffFormData) => {
    const addStaff = async () => {
      const response = await fetch("/api/admin/new-staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Staff added successfully!");
      } else {
        console.error("Failed to add staff.");
      }
    };
    addStaff();
  };

  return (
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register New Staff</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staff Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Irfan Shas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue="receptionist"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="bg-gray-800 font-semibold text-white w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white">
                        <SelectGroup>
                          <SelectLabel>Jobs</SelectLabel>
                          <SelectItem value="engineer">Engineer</SelectItem>
                          <SelectItem value="receptionist">
                            Receptionist
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Staff
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default RegisterStaff;
