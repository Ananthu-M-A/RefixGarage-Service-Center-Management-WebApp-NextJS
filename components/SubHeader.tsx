import React from "react";

function SubHeader({
  activeSection,
  onSectionChange,
}: {
  activeSection: string | null;
  onSectionChange: (section: string) => void;
}) {
  const sections = [
    { value: "services", label: "Services" },
    { value: "check-status", label: "Know Status" },
    { value: "about", label: "About Us" },
    { value: "contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 px-3 py-2 backdrop-blur">
      <ul className="mx-auto flex max-w-3xl items-center justify-center gap-2 overflow-x-auto text-sm font-semibold md:text-base">
        {sections.map((section) => (
          <li key={section.value} className="shrink-0">
            <button
              onClick={() => onSectionChange(section.value)}
              className={`rounded-full px-4 py-2 transition hover:cursor-pointer ${
                activeSection === section.value
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SubHeader;
