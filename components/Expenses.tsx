import React, { useEffect } from "react";
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

type Expense = {
  type: string;
  amount: number;
  createdAt: string;
};

function Expenses() {
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  useEffect(() => {
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
        const expenses = await response.json();
        setExpenses(expenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);
  return (
    <>
      <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>
        <Table>
          <TableCaption>
            {expenses.length > 0
              ? "A list of your expenses"
              : "No expense available at the moment."}
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
            {expenses.map((expense, index) => (
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
      </div>
    </>
  );
}

export default Expenses;
