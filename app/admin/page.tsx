"use client";

import Header from "@/components/Header";
import JobReportDiagram from "@/components/JobReportDiagram";
import Registerstaff from "@/components/RegisterStaff";
import Staffs from "@/components/Staffs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Loading from "../loading";
import BottomBar from "@/components/BottomBar";

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
      <BottomBar user={"admin"} onSectionChange={setActiveSection} />
    </>
  );
}

export default AdminDashboard;
