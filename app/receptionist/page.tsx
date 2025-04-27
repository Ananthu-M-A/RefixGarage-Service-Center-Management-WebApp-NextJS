"use client";

import React, { useState } from "react";
import Jobs from "@/components/Jobs";
import QuickBall from "@/components/QuickBall";
import Inventory from "@/components/Inventory";
import Header from "@/components/Header";
import AddStock from "@/components/AddStock";
import JobStatusDiagram from "@/components/JobStatusDiagram";
import AddJob from "@/components/AddJob";
import AddExpense from "@/components/AddExpense";
import Expenses from "@/components/Expenses";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { redirect } from "next/navigation";

function ReceptionHome() {
  const [activeSection, setActiveSection] = useState("reception");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Header user={"receptionist"} />
      {activeSection === "reception" && <JobStatusDiagram />}
      {activeSection === "add-job" && <AddJob />}
      {activeSection === "jobs" && <Jobs />}
      {activeSection === "inventory" && <Inventory />}
      {activeSection === "add-stock" && <AddStock />}
      {activeSection === "add-expense" && <AddExpense />}
      {activeSection === "expenses" && <Expenses />}
      <QuickBall user={"receptionist"} onSectionChange={setActiveSection} />
    </>
  );
}

export default ReceptionHome;
