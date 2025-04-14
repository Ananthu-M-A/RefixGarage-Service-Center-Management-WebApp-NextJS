"use client";

import React, { useState } from "react";
import JobEntry from "@/components/JobEntry";
import JobsTable from "@/components/JobsTable";
import QuickBall from "@/components/QuickBall";
import Inventory from "@/components/Inventory";
import Header from "@/components/Header";
import AddItem from "@/components/AddItem";
import JobStatusDiagram from "@/components/JobStatusDiagram";

function ReceptionHome() {
  const [activeSection, setActiveSection] = useState("reception");

  return (
    <>
      <Header user={"receptionist"} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
        {activeSection === "reception" && <JobStatusDiagram />}
        {activeSection === "new-job" && <JobEntry />}
        {activeSection === "jobs" && <JobsTable />}
        {activeSection === "inventory" && <Inventory />}
        {activeSection === "add-to-inventory" && <AddItem />}
        <QuickBall onSectionChange={setActiveSection} />
      </main>
    </>
  );
}

export default ReceptionHome;
