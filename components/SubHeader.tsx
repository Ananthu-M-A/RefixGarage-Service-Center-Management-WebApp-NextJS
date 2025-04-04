import React from "react";

function SubHeader({ onSectionChange }: { onSectionChange: (section: string) => void }) {
  return (
    <nav className="bg-gray-700 opacity-80 px-4 py-1 rounded-full mt-1 mb-1 border-b-1 sticky top-0 z-50">
      <ul className="flex justify-center space-x-5 text-lg font-semibold">
        <li>
          <button onClick={() => onSectionChange("services")} className="text-white hover:underline">
            Services
          </button>
        </li>
        <li>
          <button onClick={() => onSectionChange("about")} className="text-white hover:underline">
            About Us
          </button>
        </li>
        <li>
          <button onClick={() => onSectionChange("contact")} className="text-white hover:underline">
            Contact
          </button>
        </li>
        <li>
          <button onClick={() => onSectionChange("check-status")} className="text-white hover:underline">
            Know Status
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default SubHeader;
