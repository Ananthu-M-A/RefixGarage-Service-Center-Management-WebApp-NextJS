"use client";

import React, { useState } from "react";
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
import { Textarea } from "./ui/textarea";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { STOCK_CATEGORIES } from "@/constants/categories";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Item name must be at least 2 characters." }),
  category: z
    .string()
    .min(2, { message: "Item category must be at least 2 characters." }),
  cost: z.coerce
    .number()
    .min(10, { message: "Unit cost must be at least ₹10." }),
  count: z.coerce
    .number()
    .min(1, { message: "Item count must be at least 1." }),
  description: z.string(),
});

type InventoryFormData = z.infer<typeof formSchema> & {
  _id?: string;
};
type InventoryEntryProps = {
  item?: InventoryFormData;
};

function AddStock({ item }: InventoryEntryProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<InventoryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: item ?? {
      name: "",
      category: "",
      cost: 0,
      count: 0,
      description: "",
    },
  });

  const onSubmit = (data: InventoryFormData) => {
    if (loading) return;
    setLoading(true);
    if (item) {
      const updateInventory = async () => {
        const response = await fetch(`/api/reception/inventory/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        setLoading(false);
        if (response.ok) {
          showSuccessToast("Inventory updated successfully!");
          window.location.reload();
        } else {
          const error = await response.json();
          showErrorToast(error.message);
        }
      };
      updateInventory();
    } else {
      const addItem = async () => {
        const response = await fetch("/api/reception/inventory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        setLoading(false);
        if (response.ok) {
          showSuccessToast("Added item successfully!");
          window.location.reload();
        } else {
          const error = await response.json();
          showErrorToast(error.message);
        }
      };
      addItem();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-4 md:p-6">
      <div className="w-full max-w-4xl bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {item ? "Edit Stock" : "New Stock Entry"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-gray-900 text-white hover:cursor-pointer">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white">
                          {STOCK_CATEGORIES.map((category, index) => (
                            <SelectItem
                              key={index}
                              value={category}
                              className="hover:bg-white hover:text-black"
                            >
                              {category}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg:- Digital Mic"
                        {...field}
                        disabled={!!item}
                        className="bg-gray-900 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Cost</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Eg:- 250"
                        {...field}
                        className="bg-gray-900 text-white"
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
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Count</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Eg:- 10"
                        {...field}
                        className="bg-gray-900 text-white"
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description..."
                      {...field}
                      className="bg-gray-900 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
              disabled={loading}
            >
              {loading ? "Processing..." : item ? "Update Stock" : "Add Item"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default AddStock;
