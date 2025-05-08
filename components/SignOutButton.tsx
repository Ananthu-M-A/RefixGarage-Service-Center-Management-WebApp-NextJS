"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
      onClick={() => {
        setLoading(true);
        signOut({ callbackUrl: "/login" });
      }}
      disabled={loading}
    >
      {loading ? "Wait..." : "Sign Out"}
    </Button>
  );
}
