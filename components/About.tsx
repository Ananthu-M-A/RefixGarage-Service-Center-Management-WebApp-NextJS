import React from "react";

function About() {
  return (
    <section
      id="about"
      className="w-full px-4 py-12 bg-transparent text-white flex justify-center items-center"
    >
      <div className="max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          Refix Garage is dedicated to providing expert smartphone repair services
          with a strong focus on quality craftsmanship and customer satisfaction.
          We aim to deliver reliable solutions and transparent service to ensure
          your devices are in the best hands.
        </p>
      </div>
    </section>
  );
}

export default About;
