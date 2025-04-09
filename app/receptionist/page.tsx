"use client";

import React, { useState } from "react";
import JobEntry from "@/components/JobEntry";
import JobsTable from "@/components/JobsTable";
import QuickBall from "@/components/QuickBall";
import Inventory from "@/components/Inventory";
import Header from "@/components/Header";

function ReceptionHome() {
  const [activeSection, setActiveSection] = useState("new-job");

  return (
    <>
      <Header user={"receptionist"} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
        {activeSection === "new-job" && <JobEntry />}
        {activeSection === "jobs" && <JobsTable />}
        {activeSection === "inventory" && <Inventory />}
        <QuickBall onSectionChange={setActiveSection} />
      </main>
    </>
  );
}

export default ReceptionHome;
