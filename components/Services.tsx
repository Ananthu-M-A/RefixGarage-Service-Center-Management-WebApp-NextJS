import React from "react";

function Services() {
  return (
    <>
      <section
        id="services"
        className="min-h-screen bg-gray-800 text-white p-10"
      >
        <h2 className="text-2xl font-bold mb-5">Our Services</h2>
        <p>
          We offer a wide range of smartphone repair services including screen
          replacement, battery replacement, and more.
        </p>
        <ul className="list-disc list-inside mt-5">
          <li>Screen Replacement</li>
          <li>Battery Replacement</li>
          <li>Software Troubleshooting</li>
          <li>Water Damage Repair</li>
          <li>Charging Port Repair</li>
        </ul>
      </section>
    </>
  );
}

export default Services;
