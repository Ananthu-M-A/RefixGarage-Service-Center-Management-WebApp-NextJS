"use client";

import React from "react";
import Image from "next/image";
import { MdCall, MdViewWeek } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { TiTime } from "react-icons/ti";
import SignOutButton from "./SignOutButton";
import { useRouter } from "next/navigation";

function Header({ user }: { user: string }) {
  const router = useRouter();
  return (
    <nav className="bg-black border-b border-gray-700 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="shadow-md rounded-full"
            priority={true}
          />
          <h1
            className="text-3xl md:text-5xl font-bold text-center md:text-left hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            REFIX GARAGE
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto space-y-6 md:space-y-0 md:space-x-8">
          {user === "guest" && (
            <div className="flex flex-col items-start text-left space-y-2">
              <div className="flex items-center space-x-2">
                <MdViewWeek className="text-xl" />
                <span className="text-sm">SUN - SAT</span>
              </div>
              <div className="flex items-center space-x-2">
                <TiTime className="text-xl" />
                <span className="text-sm">9:30AM - 9:30PM</span>
              </div>
            </div>
          )}
          <div className="flex flex-col items-end text-right space-y-2">
            {user === "guest" ? (
              <>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      process.env.NEXT_PUBLIC_EMAIL as string
                    )
                  }
                  title="Click to copy email"
                >
                  <FiMail className="text-xl" />
                  <span className="text-sm">
                    {process.env.NEXT_PUBLIC_EMAIL as string}
                  </span>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      process.env.NEXT_PUBLIC_CONTACT_NUMBER as string
                    )
                  }
                  title="Click to copy phone number"
                >
                  <MdCall className="text-xl" />
                  <span className="text-sm">
                    {process.env.NEXT_PUBLIC_CONTACT_NUMBER as string}
                  </span>
                </div>
              </>
            ) : (
              <SignOutButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
