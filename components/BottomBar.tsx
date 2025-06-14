"use client";

import React from "react";
import {
  Home,
  PlusCircle,
  ClipboardList,
  PackagePlus,
  Boxes,
  FilePlus2,
  ReceiptText,
  LayoutDashboard,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { MdBusinessCenter } from "react-icons/md";

const receptionistSections = [
  { value: "add-job", label: "Add Job", icon: <PlusCircle size={22} /> },
  { value: "jobs", label: "Jobs", icon: <ClipboardList size={22} /> },
  { value: "add-stock", label: "Add Stock", icon: <PackagePlus size={22} /> },
  { value: "inventory", label: "Inventory", icon: <Boxes size={22} /> },
  { value: "reception", label: "Reception", icon: <Home size={22} /> },
  { value: "add-expense", label: "Add Expense", icon: <FilePlus2 size={22} /> },
  { value: "expenses", label: "Expenses", icon: <ReceiptText size={22} /> },
  { value: "add-dealer", label: "Add Dealer", icon: <UserPlus size={22} /> },
  { value: "deals", label: "Deals", icon: <MdBusinessCenter size={22} /> },
];

const adminSections = [
  {
    value: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={22} />,
  },
  { value: "new-staff", label: "Add New Staff", icon: <UserPlus size={22} /> },
  { value: "staff-list", label: "Staff List", icon: <Users size={22} /> },
];

function BottomBar({
  onSectionChange,
  user,
}: {
  onSectionChange: (section: string) => void;
  user: string;
}) {
  const sections =
    user === "receptionist" ? receptionistSections : adminSections;

  return (
    <nav
      className={`
        fixed bottom-0 left-0 w-full z-50
        bg-gray-900/95 backdrop-blur
        border-t border-gray-800
        flex justify-center items-center
        px-2 py-2
        md:w-auto md:left-1/2 md:-translate-x-1/2 md:rounded-full md:bottom-6 md:px-6 md:py-3 md:shadow-2xl
        transition-all
      `}
      style={{
        maxWidth: "800px",
      }}
      aria-label="Quick Navigation"
    >
      <div className="flex flex-1 justify-between items-center gap-1 md:gap-4 w-full md:w-auto">
        {sections.map((section) => (
          <Button
            key={section.value}
            title={section.label}
            className={`
              flex flex-col items-center justify-center
              text-white hover:text-blue-400 focus:text-blue-400
              transition-all px-2 py-1
              active:scale-95
              group
              bg-transparent border-none shadow-none
              md:px-3 md:py-2
            `}
            style={{
              minWidth: 48,
              minHeight: 48,
            }}
            onClick={() => onSectionChange(section.value)}
            variant="ghost"
          >
            <span className="flex items-center justify-center">
              {section.icon}
            </span>
            <span className="text-[10px] mt-1 font-medium hidden md:block text-center">
              {section.label}
            </span>
          </Button>
        ))}
      </div>
    </nav>
  );
}

export default BottomBar;
