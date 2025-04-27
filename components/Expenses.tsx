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

type Expense = {
  type: string;
  amount: number;
  createdAt: string;
};

function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!currentExpenses.length) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="Search expenses..."
            name="search"
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        <Table>
          <TableCaption>
            {filteredExpenses.length === 0 &&
              "No expenses available at the moment."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] text-gray-400">Sl No</TableHead>
              <TableHead className="text-gray-400">Expense</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-right text-gray-400">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentExpenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{expense.type.toLocaleUpperCase()}</TableCell>
                <TableCell>₹{expense.amount}</TableCell>
                <TableCell className="text-right">
                  {new Date(expense.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-gray-700 text-white"
                  : "bg-gray-900 text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Expenses;
