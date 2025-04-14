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
        <Button className="fixed bottom-10 left-10 m-4 p-5 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out border-4 border-gray-500 hover:border-gray-300 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 text-white rounded-lg shadow-lg p-2">
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
              value="new-job"
            >
              New Job
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="jobs"
            >
              Jobs
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="add-to-inventory"
            >
              Add to Inventory
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
              value="inventory"
            >
              Inventory
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
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default QuickBall;
