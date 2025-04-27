"use client";

import Header from "@/components/Header";
import JobReportDiagram from "@/components/JobReportDiagram";
import QuickBall from "@/components/QuickBall";
import Registerstaff from "@/components/RegisterStaff";
import Staffs from "@/components/Staffs";
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
      {activeSection === "dashboard" && <JobReportDiagram />}
      {activeSection === "new-staff" && <Registerstaff />}
      {activeSection === "staff-list" && <Staffs />}
      <QuickBall user={"admin"} onSectionChange={setActiveSection} />
    </>
  );
}

export default AdminDashboard;
