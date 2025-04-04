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
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

type QuickBallOption = "new-job" | "jobs" | "inventory";

function QuickBall() {
  const router = useRouter();
  const [position, setPosition] = useState<QuickBallOption | "">("");

  const handleSelect = (value: QuickBallOption) => {
    setPosition(value);
    switch (value) {
      case "new-job":
        router.push("/new-job");
        break;
      case "jobs":
        router.push("/jobs");
        break;
      case "inventory":
        router.push("/inventory");
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="fixed bottom-10 left-10 m-4 p-5 bg-gray-800 text-white rounded-full shadow-lg 
                     hover:bg-gray-600 transition duration-300 ease-in-out border-4 border-gray-500 
                     hover:border-gray-300 cursor-pointer"
        >
          <Plus size={24} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-gray-800 rounded-lg shadow-lg p-2 w-40">
        <DropdownMenuRadioGroup
          value={position}
          // onValueChange={handleSelect}
          className="flex flex-col items-start"
        >
          <DropdownMenuRadioItem
            value="new-job"
            className="text-white text-sm px-3 py-2 rounded hover:bg-gray-700 w-full"
          >
            New Job
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="jobs"
            className="text-white text-sm px-3 py-2 rounded hover:bg-gray-700 w-full"
          >
            Jobs
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="inventory"
            className="text-white text-sm px-3 py-2 rounded hover:bg-gray-700 w-full"
          >
            Inventory
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default QuickBall;
