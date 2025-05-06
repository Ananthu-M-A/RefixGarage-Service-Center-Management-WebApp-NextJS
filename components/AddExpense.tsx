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
import { EXPENSE_TYPES } from "@/constants/expenses";

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
        window.location.reload();
      } else {
        const error = await response.json();
        showErrorToast(error.message);
      }
    };
    AddExpense();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-4 md:p-6">
      <div className="w-full max-w-4xl bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">New Expense Entry</h2>
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-gray-900 text-white hover:cursor-pointer">
                          <SelectValue placeholder="Select expense type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white">
                          {EXPENSE_TYPES.map((type, index) => (
                            <SelectItem
                              key={index}
                              value={type}
                              className="hover:bg-white hover:text-black"
                            >
                              {type}
                            </SelectItem>
                          ))}
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
                        placeholder="Eg:- 2500"
                        type="number"
                        className="bg-gray-900 text-white"
                        {...field}
                        onFocus={(e) => {
                          if (e.target.value === "0") {
                            e.target.value = "";
                            field.onChange("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
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
