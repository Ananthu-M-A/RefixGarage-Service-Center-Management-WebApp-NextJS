"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

function LoginForm({ user }: { user: string }) {
  const [userType] = useState(user);
  return (
    <>
      <section className="h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            {(user === "admin" && `Admin Login`) ||
              (user === "engineer" && `Engineer Login`)}
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-white mb-2 font-semibold"
                htmlFor="email"
              >
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
              <label
                className="block text-white mb-2 font-semibold"
                htmlFor="password"
              >
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
          {userType === "admin" && (
            <p className="text-white mt-4">
              {`Need help? `}
              <Link
                href={`mailto:ananthumapookkad@gmail.com`}
                className="text-blue-500"
              >
                Contact support.
              </Link>
            </p>
          )}
          {userType === "engineer" && (
            <p className="text-white mt-4">
              <Link href="/forgot-password" className="text-white mt-4">
                Forgot your password?
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default LoginForm;
