"use client";

import React, { useState } from "react";
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
import { showErrorToast, showSuccessToast } from "@/lib/toast";

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
  const [loading, setLoading] = useState(false);
  const form = useForm<StaffFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  const onSubmit = (data: StaffFormData) => {
    if (loading) return;
    setLoading(true);
    const addStaff = async () => {
      const response = await fetch("/api/admin/new-staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setLoading(false);
      if (response.ok) {
        showSuccessToast("Staff added successfully!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        showErrorToast(errorData.message);
      }
    };
    addStaff();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-4xl text-white bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register New Staff
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Staff Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Irfan Shas"
                        {...field}
                        className="bg-gray-900 text-white"
                      />
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
                      <Input
                        placeholder="example@example.com"
                        {...field}
                        className="bg-gray-900 text-white"
                      />
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
                        <SelectTrigger className="bg-gray-900 font-semibold text-white w-full hover:cursor-pointer">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white">
                          <SelectGroup>
                            <SelectLabel>Staffs</SelectLabel>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg hover:cursor-pointer"
              disabled={loading}
            >
              {loading ? "Processing..." : "Add Staff"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default RegisterStaff;
