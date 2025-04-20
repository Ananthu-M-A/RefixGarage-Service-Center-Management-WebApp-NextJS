"use client";

import React, { useEffect, useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { showErrorToast } from "@/lib/toast";

type Staff = {
  _id: string;
  name: string;
  role: string;
  status: string;
};

function StaffsTable() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const response = await fetch("/api/admin/staffs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        showErrorToast("Failed to fetch staffs.");
        throw new Error("Failed to fetch staffs");
      }
      const data = await response.json();
      setStaffs(data);
      setFilteredStaffs(data);
    } catch (error) {
      console.error("Error fetching staffs:", error);
      setError("Failed to load staff data. Please try again later.");
    }
  };

  const handleSort = (order: string) => {
    const sorted = [...filteredStaffs].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredStaffs(sorted);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = staffs.filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchTerm) ||
        staff.role.toLowerCase().includes(searchTerm) ||
        staff.status.toLowerCase().includes(searchTerm)
    );
    setFilteredStaffs(filtered);
  };

  const handleFilterChange = (value: string) => {
    if (value === "all-staffs") {
      setFilteredStaffs(staffs);
    } else {
      const filtered = staffs.filter((staff) => staff.role === value);
      setFilteredStaffs(filtered);
    }
  };

  return (
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Staffs</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex items-center justify-between mb-4">
        <Select defaultValue="all-staffs" onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[120px] bg-gray-800 font-semibold text-white">
            <SelectValue placeholder="Filtered by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            <SelectGroup>
              <SelectLabel>Staffs</SelectLabel>
              <SelectItem value="all-staffs">All</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="receptionist">Receptionist</SelectItem>
              <SelectItem value="engineer">Engineer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search staffs..."
          name="search"
          onChange={handleSearchChange}
          className="w-1/2"
        />
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Sort by:</span>
          <AiOutlineSortAscending
            className="text-white bg-gray-900 cursor-pointer"
            size={20}
            onClick={() => handleSort("asc")}
            title="Sort Ascending"
          />
          <AiOutlineSortDescending
            className="text-white bg-gray-900 cursor-pointer"
            size={20}
            onClick={() => handleSort("desc")}
            title="Sort Descending"
          />
        </div>
      </div>
      <Table>
        <TableCaption>
          {filteredStaffs.length > 0
            ? "A list of staffs."
            : "No staffs listed at the moment."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] text-gray-400">Staff No</TableHead>
            <TableHead className="text-gray-400">Name</TableHead>
            <TableHead className="text-gray-400">Role</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-center text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStaffs.map((staff, index) => (
            <TableRow key={staff._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.role}</TableCell>
              <TableCell>{staff.status}</TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" className="text-white px-2">
                  Activate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StaffsTable;
