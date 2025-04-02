import JobEntry from "@/components/JobEntry";
import QuickBall from "@/components/QuickBall";
import React from "react";

function EngineerHome() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen h-16 bg-gradient-to-b from-black to-gray-900 text-white">
        <JobEntry />
      </div>
      <QuickBall />
    </>
  );
}

export default EngineerHome;
