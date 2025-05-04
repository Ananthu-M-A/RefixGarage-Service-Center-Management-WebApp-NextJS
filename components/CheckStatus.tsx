import React from "react";
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
  mobile: z
    .string()
    .length(10, { message: "Mobile number must be 10 digits." }),
  jobId: z
    .string()
    .length(24, { message: "Job ID must be exactly 24 characters." }),
});

type CheckStatusFormData = z.infer<typeof formSchema>;

function CheckStatus() {
  const form = useForm<CheckStatusFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
      jobId: "",
    },
  });

  const onSubmit = async (data: CheckStatusFormData) => {
    try {
      const response = await fetch(
        `/api/customer?mobile=${data.mobile}&jobId=${data.jobId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      className="w-full px-4 min-h-screen flex flex-wrap gap-10 justify-center items-center bg-transparent text-white"
    >
      <div className="bg-gray-800 w-full max-w-md border border-gray-700 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-center text-2xl font-bold text-white">
            Check Service Status
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Job Id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-md"
            >
              Know Service Status
            </Button>
          </form>
        </Form>
      </div>
      <div className="bg-gray-800 w-full max-w-md border border-gray-700 rounded-lg shadow-lg p-6">
        <h3 className="text-3xl font-bold text-center mb-4">How To Check</h3>
        <p className="text-center mb-4 text-lg">
          Kindly enter both the mobile number you provided during the
          registration process and the Job ID you received via WhatsApp at the
          time of registration. This information is required to check the
          current service status of your smartphone.
        </p>
        <p className="text-center font-bold text-lg mb-2">Team Refix Garage</p>
        <p className="text-center text-sm text-gray-400 mb-4">
          If you have any questions, please contact us at{" "}
          <a
            href={`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`}
            className="text-blue-500 hover:underline"
          >
            {process.env.NEXT_PUBLIC_CONTACT_NUMBER}
          </a>
        </p>
      </div>
    </section>
  );
}

export default CheckStatus;
