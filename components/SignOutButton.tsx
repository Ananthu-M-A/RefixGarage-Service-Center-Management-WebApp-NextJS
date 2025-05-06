"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <Button
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Sign Out
    </Button>
  );
}
