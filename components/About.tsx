import Image from "next/image";
import React from "react";

function About() {
  return (
    <section
      id="about"
      className="w-full px-6 py-12 min-h-screen bg-transparent text-white flex flex-col-1 items-center"
    >
      <div className="relative w-full max-w-6xl mb-8">
        <Image
          src="/images/logo.png"
          alt="Background Image"
          width={750}
          height={750}
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
      <div className="max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
          Welcome to <strong>Refix Garage</strong>, your trusted partner for
          expert smartphone repair services. We specialize in providing
          high-quality repairs for a wide range of devices, ensuring that your
          gadgets are restored to their optimal performance. With years of
          experience and a team of skilled technicians, we are committed to
          delivering exceptional service and unmatched craftsmanship.
        </p>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
          At Refix Garage, customer satisfaction is at the heart of everything
          we do. We believe in offering transparent, reliable, and affordable
          solutions to meet your repair needs. Whether it&apos;s a cracked
          screen, battery replacement, or software issues, we handle every
          repair with precision and care.
        </p>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          Our mission is to ensure that your devices are in the best hands. We
          take pride in our attention to detail, quick turnaround times, and
          dedication to quality. Trust us to bring your devices back to life and
          keep you connected to the world.
        </p>
      </div>
    </section>
  );
}

export default About;