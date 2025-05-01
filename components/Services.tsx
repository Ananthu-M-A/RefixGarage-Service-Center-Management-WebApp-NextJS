import Image from "next/image";
import React, { useState, useEffect } from "react";

const serviceImages = [
  { name: "Screen Replacement", src: "/images/screen-replacement.jpg" },
  { name: "Battery Replacement", src: "/images/battery-replacement.jpg" },
  { name: "Motherboard Repair", src: "/images/motherboard-repair.jpg" },
  { name: "Water Damage Repair", src: "/images/water-damage-repair.jpg" },
  {
    name: "All Software Repair",
    src: "/images/all-software-hardware-repair.jpg",
  },
  {
    name: "All Hardware Repair",
    src: "/images/all-software-hardware-repair.jpg",
  },
];

function Services() {
  const [currentImage, setCurrentImage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredIndex !== null) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % serviceImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hoveredIndex]);

  return (
    <section
      id="services"
      className="w-full min-h-screen bg-black text-white flex flex-col justify-center items-center relative"
    >
      <div className="absolute inset-0">
        <Image
          src={serviceImages[hoveredIndex ?? currentImage].src}
          alt={serviceImages[hoveredIndex ?? currentImage].name}
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 max-w-4xl px-4 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
          We offer a wide range of smartphone repair services including screen
          replacement, battery replacement, and more.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
          {serviceImages.map((service, index) => (
            <li
              key={index}
              className="cursor-pointer bg-gray-700 opacity-70 text-center hover:text-white text-xl p-2 rounded-full hover:font-bold transition"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {service.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Services;
