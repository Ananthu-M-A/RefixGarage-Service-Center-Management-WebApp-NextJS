import React from "react";

function Services() {
  return (
    <section
      id="services"
      className="w-full px-4 min-h-screen bg-transparent text-white flex justify-center items-center"
    >
      <div className="max-w-3xl text-left">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          We offer a wide range of smartphone repair services including screen
          replacement, battery replacement, and more.
        </p>
        <ul className="list-disc list-inside mt-6 space-y-2 text-gray-200">
          <li>Screen Replacement</li>
          <li>Battery Replacement</li>
          <li>Software Troubleshooting</li>
          <li>Water Damage Repair</li>
          <li>Charging Port Repair</li>
        </ul>
      </div>
    </section>
  );
}

export default Services;
