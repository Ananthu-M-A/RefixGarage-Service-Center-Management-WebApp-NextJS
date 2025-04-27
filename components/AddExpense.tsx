"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const formSchema = z.object({
  type: z.string().min(1, { message: "Expense type is required." }),
  amount: z.coerce
    .number()
    .min(1, { message: "Amount must be a positive number." }),
  _id: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof formSchema> & {
  _id?: string;
};
type ExpenseEntryProps = {
  item?: ExpenseFormData;
};

function AddExpense({ item }: ExpenseEntryProps) {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: item ?? {
      type: "",
      amount: 0,
    },
  });

  const onSubmit = (data: ExpenseFormData) => {
    const AddExpense = async () => {
      const response = await fetch("/api/reception/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        showSuccessToast("Added expense successfully!");
      } else {
        showErrorToast("Failed to add expense.");
      }
    };
    AddExpense();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select expense type.." />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-white">
                          <SelectItem
                            className="hover:bg-white hover:text-black"
                            value={"electricity"}
                          >
                            Electricity Bill
                          </SelectItem>
                          <SelectItem
                            className="hover:bg-white hover:text-black"
                            value={"rent"}
                          >
                            Rent
                          </SelectItem>
                          <SelectItem
                            className="hover:bg-white hover:text-black"
                            value={"other"}
                          >
                            Other Expenses
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter expense amount.."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Expense
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default AddExpense;
