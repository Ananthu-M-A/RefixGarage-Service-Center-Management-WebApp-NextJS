"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function QuickBall() {
  const [position, setPosition] = useState("bottom");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="fixed bottom-10 left-10 m-4 p-5 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out border-4 border-gray-500 hover:border-gray-300 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-transparent rounded-lg shadow-lg p-2 ">
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={setPosition}
            className="flex flex-col items-start"
          >
            <DropdownMenuRadioItem
              className="text-white text-lg px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 ease-in-out cursor-pointer mx-auto"
              value="jobs"
            >
              Jobs
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className="text-white text-lg px-4 py-2 rounded-md hover:bg-transparent transition duration-200 ease-in-out cursor-pointer mx-auto"
              value="inventory"
            >
              Inventory
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default QuickBall;
