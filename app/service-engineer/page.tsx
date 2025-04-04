"use client";

import React from "react";
import JobEntry from "@/components/JobEntry";
import JobsTable from "@/components/JobsTable";
import QuickBall from "@/components/QuickBall";

function EngineerHome() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black to-gray-900 text-white px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="w-full">
          <JobEntry />
        </div>
        <div className="w-full">
          <JobsTable />
        </div>
      </div>
      <QuickBall />
    </div>
  );
}

export default EngineerHome;
