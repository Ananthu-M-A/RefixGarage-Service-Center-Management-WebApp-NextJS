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

const formSchema = z.object({
  name: z.string().min(2, { message: "Item must be at least 2 characters." }),
  category: z
    .string()
    .min(2, { message: "Category must be at least 2 characters." }),
  cost: z.number().min(0, { message: "Cost must be a positive number." }),
  count: z.number().min(1, { message: "Count must be at least 1." }),
});

type ItemFormData = z.infer<typeof formSchema>;
type ItemEntryProps = {
  item?: ItemFormData;
};

function ItemEntry({ item }: ItemEntryProps) {
  const form = useForm<ItemFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: item ?? {
        name: "",
        category: "",
        cost: 0,
        count: 0,
    },
  });

  const onSubmit = (data: ItemFormData) => {
    if (item) {
      console.log("Editing Item:", data);
    } else {
      console.log("Creating Item:", data);
    }
  };

  return (
    <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {item ? "Edit Item" : "New Item Entry"}
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
                    <Input placeholder="Digital Microphone" {...field} />
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
                    <Input placeholder="Spare Parts" {...field} />
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
                  <FormLabel>Item Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter item cost"
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
                  <FormLabel>Estimated Cost</FormLabel>
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
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {item ? "Update Item" : "Submit Item"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ItemEntry;
