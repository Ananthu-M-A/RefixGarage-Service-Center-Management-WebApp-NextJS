import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 2 characters long." }),
  mobile: z
    .string()
    .length(10, { message: "Mobile number must be 10 digits." }),
});

type CheckStatusFormData = z.infer<typeof formSchema>;

function CheckStatus() {
  const [loading, setLoading] = useState(false);

  const form = useForm<CheckStatusFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
    },
  });

  const onSubmit = async (data: CheckStatusFormData) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/customer?name=${data.name}&mobile=${data.mobile}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (!response.ok) {
        if (response.status === 404) {
          showErrorToast("No job found with the provided details.");
          return;
        }
      }
      if (response.status === 500) {
        showErrorToast("Internal server error. Please try again later.");
        return;
      }
      const result = await response.json();
      if (result.status === "ok" || result.status === "notok") {
        showSuccessToast(
          `${result.customer}, Your device is ready for pickup.`
        );
      } else if (result.status === "pending") {
        showSuccessToast(
          `${result.customer}, Your device is currently being repaired.`
        );
      } else {
        showErrorToast("Unknown status. Please contact support.");
      }
    } catch (err) {
      if (err instanceof Error) {
        showErrorToast(err.message);
      } else {
        showErrorToast("An unexpected error occurred.");
      }
    }
  };

  return (
    <section
      id="check-status"
      className="w-full px-4 min-h-screen flex flex-col lg:flex-row gap-10 justify-center items-center bg-transparent text-white"
    >
      <div className="bg-gray-800 w-full max-w-md border border-gray-700 rounded-lg shadow-lg p-6 flex flex-col justify-between h-auto lg:h-[400px]">
        <div>
          <h3 className="text-3xl font-bold text-center mb-4">
            Check Service Status
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name in capital letters"
                        {...field}
                        className="bg-gray-900 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your mobile number"
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
                className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 rounded-md hover:cursor-pointer"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Know Service Status"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="bg-gray-800 w-full max-w-md border border-gray-700 rounded-lg shadow-lg p-6 flex flex-col justify-between h-auto lg:h-[400px]">
        <div>
          <h3 className="text-3xl font-bold text-center mb-4">How To Check</h3>
          <p className="text-center mb-4 text-lg">
            Kindly enter both the mobile number and name you provided during the
            registration process, which were also used to send you a WhatsApp
            message at that time. This information is required to verify the
            current service status of your smartphone.
          </p>
        </div>
        <div>
          <p className="text-center font-bold text-lg mb-2">
            Team Refix Garage
          </p>
          <p className="text-center text-sm text-gray-400">
            If you have any questions, please contact us at{" "}
            <a
              href={`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`}
              className="text-blue-500 hover:underline"
            >
              {process.env.NEXT_PUBLIC_CONTACT_NUMBER}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default CheckStatus;
