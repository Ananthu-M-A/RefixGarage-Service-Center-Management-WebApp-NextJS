"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/loading";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormData = z.infer<typeof formSchema>;

function LoginForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const callbackUrl =
      session?.user?.role === "admin" ? "/admin" : "/receptionist";

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });

    if (result?.ok) {
      router.push(callbackUrl);
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated") {
    router.push(session?.user?.role === "admin" ? "/admin" : "/receptionist");
    return null;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm border border-gray-700 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 text-lg font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </Button>
          </form>
        </Form>
        <p className="text-white mt-4 text-center text-sm">
          <Link href="/forgot-password" className="text-blue-400 hover:underline">
            Forgot your password?
          </Link>
        </p>
        <p className="text-white mt-4 text-center text-sm">
          Need help?{" "}
          <Link
            href="mailto:ananthumapookkad@gmail.com"
            className="text-blue-500 hover:underline"
          >
            Contact support
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginForm;