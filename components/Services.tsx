import { SERVICE_IMAGES } from "@/constants/services";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function Services() {
  const [currentImage, setCurrentImage] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredImage !== null) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % SERVICE_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hoveredImage]);

  return (
    <section
      id="services"
      className="w-full min-h-screen bg-black text-white flex flex-col justify-center items-center relative"
    >
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <Image
          src={
            hoveredImage !== null
              ? SERVICE_IMAGES[hoveredImage].src
              : SERVICE_IMAGES[currentImage].src
          }
          alt={
            hoveredImage !== null
              ? SERVICE_IMAGES[hoveredImage].name
              : SERVICE_IMAGES[currentImage].name
          }
          fill
          style={{ objectFit: "cover" }}
          priority={true}
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
          {SERVICE_IMAGES.map((service, index) => (
            <li
              key={index}
              className="cursor-pointer bg-gray-700 opacity-70 text-center hover:text-white text-xl p-2 rounded-full hover:font-bold transition"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
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
