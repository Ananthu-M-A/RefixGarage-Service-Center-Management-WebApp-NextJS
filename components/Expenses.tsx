import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { showErrorToast } from "@/lib/toast";
import { Input } from "./ui/input";
import Loading from "@/app/loading";
import { Button } from "./ui/button";
import { paginateTable } from "@/lib/paginateTable";

export type Expense = {
  type: string;
  amount: number;
  createdAt: string;
};

function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/reception/expenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        showErrorToast("Failed to fetch expenses.");
        throw new Error("Failed to fetch expenses");
      }
      const data = await response.json();
      setExpenses(data);
      setFilteredExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Failed to fetch expenses. Please try again later.");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = expenses.filter(
      (expense) =>
        expense.type.toLowerCase().includes(searchTerm) ||
        expense.amount.toString().includes(searchTerm)
    );
    setFilteredExpenses(filtered);
    setCurrentPage(1);
  };

  const { indexOfFirstItem, currentItems, totalPages } = paginateTable(
    filteredExpenses,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!expenses.length) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-4 md:p-6">
      <div className="w-full max-w-6xl bg-gray-800 p-6 md:p-8 rounded-lg shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">Expenses</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
          <Input
            placeholder="Search expenses..."
            name="search"
            onChange={handleSearchChange}
            className="w-full bg-gray-900 text-white"
          />
        </div>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableCaption>
              {filteredExpenses.length === 0 && "No expenses found."}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-gray-400">Sl No</TableHead>
                <TableHead className="text-gray-400">Expense</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-right text-gray-400">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {indexOfFirstItem + index + 1}
                  </TableCell>
                  <TableCell>{expense.type.toLocaleUpperCase()}</TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell className="text-right">
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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

export default Expenses;
