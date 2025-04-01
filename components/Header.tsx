"use client";

import React from "react";
import Image from "next/image";
import { MdCall, MdViewWeek } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { TiTime } from "react-icons/ti";

function Header() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black border-b-1 border-gray-700">
      <div className="flex flex-col text-center p-4 text-white">
        <div className="flex space-x-4 mb-2">
          <MdViewWeek className="text-xl text-white" />
          <h2 className="text-sm text-white">SUN - SAT</h2>
        </div>
        <div className="flex space-x-4 mb-2">
          <TiTime className="text-xl text-white" />
          <h3 className="text-sm text-white">9:30AM - 9:30PM</h3>
        </div>
      </div>
      <div className="flex items-center flex-shrink-0 text-white">
        <Image
          src="/logo.png"
          alt="Logo"
          width={75}
          height={75}
          className="shadow-lg"
          loading="lazy"
        />
        <h1 className="text-4xl font-bold">REFIX GARAGE</h1>
      </div>
      <div className="flex flex-col text-center p-4 text-white">
        <div
          className="flex space-x-4 mb-2 hover:cursor-pointer"
          onClick={() => navigator.clipboard.writeText("refixgarage@gmail.com")}
        >
          <FiMail className="text-xl text-white" />
          <h2 className="text-sm text-white">refixgarage@gmail.com</h2>
        </div>
        <div
          className="flex space-x-4 mb-2 hover:cursor-pointer"
          onClick={() => navigator.clipboard.writeText("+91 623 889 9623")}
        >
          <MdCall className="text-xl text-white" />
          <h3 className="text-sm text-white">+91 623 889 9623</h3>
        </div>
      </div>
    </nav>
  );
}

export default Header;
