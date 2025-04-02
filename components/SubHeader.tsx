import Link from "next/link";
import React from "react";

function SubHeader() {
  return (
    <nav className="bg-gray-700 opacity-80 px-4 py-1 rounded-full mt-1 mb-1 border-b-1 sticky top-0 z-50">
      <ul className="flex justify-center space-x-5 text-lg font-semibold">
        <li>
          <Link href="#services" className="text-white hover:underline">
            Services
          </Link>
        </li>
        <li>
          <Link href="#about" className="text-white hover:underline">
            About Us
          </Link>
        </li>
        <li>
          <Link href="#contact" className="text-white hover:underline">
            Contact
          </Link>
        </li>
        <li>
          <Link href="#check-status" className="text-white hover:underline">
            Know Status
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SubHeader;