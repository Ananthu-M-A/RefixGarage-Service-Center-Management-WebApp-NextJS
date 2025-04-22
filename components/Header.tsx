"use client";

import React from "react";
import Image from "next/image";
import { MdCall, MdViewWeek } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { TiTime } from "react-icons/ti";
import SignOutButton from "./SignOutButton";

function Header({ user }: { user: string }) {
  return (
    <nav className="bg-black border-b border-gray-700 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

        <div className="flex flex-col text-center md:text-left space-y-2 pr-5">
          {user === "guest" && (
            <>
              <div className="flex items-center space-x-2">
                <MdViewWeek className="text-xl" />
                <span className="text-sm">SUN - SAT</span>
              </div>
              <div className="flex items-center space-x-2">
                <TiTime className="text-xl" />
                <span className="text-sm">9:30AM - 9:30PM</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="shadow-md rounded-full"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">
            REFIX GARAGE
          </h1>
        </div>

        <div className="flex flex-col items-center md:items-end text-center space-y-2">
          {user === "guest" && (
            <>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() =>
                  navigator.clipboard.writeText("refixgarage@gmail.com")
                }
                title="Click to copy"
              >
                <FiMail className="text-xl" />
                <span className="text-sm">refixgarage@gmail.com</span>
              </div>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() =>
                  navigator.clipboard.writeText("+91 623 889 9623")
                }
                title="Click to copy"
              >
                <MdCall className="text-xl" />
                <span className="text-sm">+91 623 889 9623</span>
              </div>
            </>
          )}
          {user !== "guest" && <SignOutButton />}
        </div>
      </div>
    </nav>
  );
}

export default Header;