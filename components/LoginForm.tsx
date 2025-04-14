"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormData = z.infer<typeof formSchema>;
type LoginFormProps = {
  user: "admin" | "receptionist";
};

function LoginForm({ user }: LoginFormProps) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const heading =
    user === "admin"
      ? "Admin Login"
      : user === "receptionist"
      ? "Receptionist Login"
      : "Login";

  const onSubmit = async (data: LoginFormData) => {
    const callbackUrl =
      user === "admin" ? "/admin" : "/receptionist";

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });

    if (result?.ok) {
      router.push(callbackUrl);
    } else {
      form.setError("email", { message: "Invalid email or password" });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {heading}
        </h2>

        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white mb-2 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className="border border-gray-600 rounded w-full py-2 px-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2 text-lg font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </Button>
        </form>

        {user === "admin" && (
          <p className="text-white mt-4 text-center text-sm">
            Need help?{" "}
            <Link
              href="mailto:ananthumapookkad@gmail.com"
              className="text-blue-500 hover:underline"
            >
              Contact support
            </Link>
          </p>
        )}

        {user === "receptionist" && (
          <p className="text-white mt-4 text-center text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-400 hover:underline"
            >
              Forgot your password?
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default LoginForm;
