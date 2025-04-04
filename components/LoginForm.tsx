"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function LoginForm({ user }: { user: "admin" | "engineer" }) {
  const heading =
    user === "admin" ? "Admin Login" : user === "engineer" ? "Engineer Login" : "Login";

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">{heading}</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="border border-gray-600 rounded w-full py-2 px-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="border border-gray-600 rounded w-full py-2 px-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
            <Link href="mailto:ananthumapookkad@gmail.com" className="text-blue-500 hover:underline">
              Contact support
            </Link>
          </p>
        )}

        {user === "engineer" && (
          <p className="text-white mt-4 text-center text-sm">
            <Link href="/forgot-password" className="text-blue-400 hover:underline">
              Forgot your password?
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default LoginForm;
