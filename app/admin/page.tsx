"use client";

import Header from "@/components/Header";
import JobReportDiagram from "@/components/JobReportDiagram";
import QuickBall from "@/components/QuickBall";
import Registerstaff from "@/components/RegisterStaff";
import StaffsTable from "@/components/StaffsTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Loading from "../loading";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Header user={"admin"} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
        {activeSection === "dashboard" && <JobReportDiagram />}
        {activeSection === "new-staff" && <Registerstaff />}
        {activeSection === "staff-list" && <StaffsTable />}
        <QuickBall user={"admin"} onSectionChange={setActiveSection} />
      </main>
    </>
  );
}

export default AdminDashboard;
