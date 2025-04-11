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
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Item name must be at least 2 characters." }),
  category: z
    .string()
    .min(2, { message: "Item category must be at least 2 characters." }),
  cost: z.coerce
    .number()
    .min(0, { message: "Unit cost must be a positive number." }),
  count: z.coerce
    .number()
    .min(0, { message: "Item count must be a positive number." }),
  description: z.string(),
});

type InventoryFormData = z.infer<typeof formSchema> & {
  _id?: string;
};
type InventoryEntryProps = {
  item?: InventoryFormData;
};

function AddItem({ item }: InventoryEntryProps) {
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
    if (item) {
      const updateInventory = async () => {
        const response = await fetch(`/api/reception/inventory/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log("Inventory updated successfully!");
        } else {
          console.error("Failed to update inventory.");
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
        if (response.ok) {
          console.log("Added item successfully!");
        } else {
          console.error("Failed to add item.");
        }
      };
      addItem();
    }
  };

  return (
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {item ? "Edit Item" : "Add Item"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digital Mic"
                      {...field}
                      disabled={!!item}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Spare Parts"
                      {...field}
                      disabled={!!item}
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
                      placeholder="250"
                      {...field}
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
                      placeholder="Enter item count"
                      {...field}
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
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {item ? "Update Item" : "Add Item"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddItem;