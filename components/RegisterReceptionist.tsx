"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

type RegisterFormData = z.infer<typeof formSchema>;

function RegisterReceptionist() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const registerReceptionist = async () => {
      const res = await fetch("/api/admin/new-receptionist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const response = await res.json();
        console.log("Registration successful:", response);
      } else {
        console.error("Registration failed:", res.statusText);
      }
    };
    registerReceptionist();
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Add New Receptionist
        </h2>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white mb-2 font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              autoComplete="email"
              className="border border-gray-600 rounded w-full py-2 px-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              {...form.register("name")}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white mb-2 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="border border-gray-600 rounded w-full py-2 px-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              {...form.register("email")}
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 text-lg font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add New Receptionist
          </Button>
        </form>
      </div>
    </section>
  );
}

export default RegisterReceptionist;
