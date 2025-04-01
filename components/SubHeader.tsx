import React from "react";

function SubHeader() {
  return (
    <nav className="bg-black p-1">
      <ul className="flex justify-center space-x-5 text-lg font-semibold">
        <li>
          <a href="#services" className="text-gray-400 hover:text-gray-700">
            Services
          </a>
        </li>
        <li>
          <a href="#about" className="text-gray-400 hover:text-gray-700">
            About Us
          </a>
        </li>
        <li>
          <a href="#contact" className="text-gray-400 hover:text-gray-700">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SubHeader;
