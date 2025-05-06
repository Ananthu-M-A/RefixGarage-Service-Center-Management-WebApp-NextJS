"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function QuickBall({
  onSectionChange,
  user,
}: {
  onSectionChange: (section: string) => void;
  user: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="fixed bottom-10 left-10 m-4 p-5 bg-gray-900 text-white rounded-full shadow-lg hover:cursor-pointer
          hover:bg-gray-600 transition duration-300 ease-in-out border-4 border-gray-500 
          hover:border-gray-300 cursor-pointer md:bottom-12 md:left-12"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-gray-900 text-white rounded-lg shadow-lg p-2 w-64 md:w-72 lg:w-80 
        max-h-96 overflow-y-auto"
      >
        {user === "receptionist" && (
          <DropdownMenuRadioGroup onValueChange={onSectionChange}>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="reception"
            >
              Reception
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="add-job"
            >
              Add Job
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="jobs"
            >
              Jobs
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="add-stock"
            >
              Add Stock
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="inventory"
            >
              Inventory
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="add-expense"
            >
              Add Expense
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="expenses"
            >
              Expenses
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        )}
        {user === "admin" && (
          <DropdownMenuRadioGroup onValueChange={onSectionChange}>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="dashboard"
            >
              Dashboard
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="new-staff"
            >
              Add New Staff
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="staff-list"
            >
              Staff List
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default QuickBall;
