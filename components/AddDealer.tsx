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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { DEALER_TYPES } from "@/constants/dealer";

const formSchema = z.object({
  type: z.string().min(1, { message: "Dealer type is required." }),
  name: z.string().min(2, { message: "Dealer name is required." }),
  _id: z.string().optional(),
});

type DealerFormData = z.infer<typeof formSchema> & {
  _id?: string;
};
type DealerEntryProps = {
  item?: DealerFormData;
};

function AddDealer({ item }: DealerEntryProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<DealerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: item ?? {
      type: "",
      name: "",
    },
  });

  const onSubmit = (data: DealerFormData) => {
    if (loading) return;
    setLoading(true);

    const AddDealer = async () => {
      const response = await fetch("/api/reception/dealers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setLoading(false);
      if (response.ok) {
        showSuccessToast("Added dealer successfully!");
        window.location.reload();
      } else {
        const error = await response.json();
        showErrorToast(error.message);
      }
    };
    AddDealer();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-4 md:p-6">
      <div className="w-full max-w-4xl bg-gray-800 p-6 md:p-8 rounded-lg shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">
          New Dealer Entry
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dealer Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-gray-900 text-white hover:cursor-pointer">
                          <SelectValue placeholder="Select dealer type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white">
                          {DEALER_TYPES.map((type, index) => (
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dealer Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg:- Ananthu M A"
                        type="text"
                        className="bg-gray-900 text-white"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
              disabled={loading}
            >
              {loading ? "Processing..." : "Add Dealer"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default AddDealer;
