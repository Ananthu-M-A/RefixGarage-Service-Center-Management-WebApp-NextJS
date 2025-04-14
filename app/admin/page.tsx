"use client";

import Header from "@/components/Header";
import JobReportDiagram from "@/components/JobReportDiagram";
import QuickBall from "@/components/QuickBall";
import React, { useState } from "react";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <>
      <Header user={"admin"} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
        {activeSection === "dashboard" && <JobReportDiagram />}
        <QuickBall user={"admin"} onSectionChange={setActiveSection} />
      </main>
    </>
  );
}

export default AdminDashboard;
