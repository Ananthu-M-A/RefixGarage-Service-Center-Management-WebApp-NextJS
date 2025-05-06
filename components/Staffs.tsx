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
import Loading from "@/app/loading";

type Staff = {
  _id: string;
  name: string;
  role: string;
  status: string;
};

function Staffs() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const staffsPerPage = 10;

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
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    if (value === "all-staffs") {
      setFilteredStaffs(staffs);
    } else {
      const filtered = staffs.filter((staff) => staff.role === value);
      setFilteredStaffs(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastStaff = currentPage * staffsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
  const currentStaffs = filteredStaffs.slice(
    indexOfFirstStaff,
    indexOfLastStaff
  );

  const totalPages = Math.ceil(filteredStaffs.length / staffsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!currentStaffs.length) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-6xl text-white bg-gray-800 p-6 rounded-lg shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">Staffs</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
          <Select defaultValue="all-staffs" onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full md:w-[150px] bg-gray-900 font-semibold text-white hover:cursor-pointer">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
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
            className="w-full md:w-1/2 bg-gray-900 text-white"
          />
          <div className="flex items-center space-x-4">
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
        <Table className="w-full">
          <TableCaption>
            {filteredStaffs.length === 0 && "No staffs found."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-gray-400 text-center">
                No
              </TableHead>
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-center text-gray-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStaffs.map((staff, index) => (
              <TableRow key={staff._id}>
                <TableCell className="text-center font-medium">
                  {index + 1 + (currentPage - 1) * staffsPerPage}
                </TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.status}</TableCell>
                <TableCell className="text-center">
                  <Button className="w-min bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer">
                    Activate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded hover:cursor-pointer ${
                currentPage === page
                  ? "bg-gray-700 text-white"
                  : "bg-gray-900 text-white"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Staffs;
