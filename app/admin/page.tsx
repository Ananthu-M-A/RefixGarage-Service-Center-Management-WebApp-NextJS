"use client";

import Header from "@/components/Header";
import React from "react";

function AdminDashboard() {
  return (
    <>
      <Header user={"admin"} />
      <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 text-white px-4 py-10">
        <div className="max-w-7xl mx-auto w-full"></div>
        <div className="max-w-7xl mx-auto mt-8 w-full">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-gray-300">
              Welcome to the admin dashboard. Use the controls above or side
              navigation to manage the system.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
