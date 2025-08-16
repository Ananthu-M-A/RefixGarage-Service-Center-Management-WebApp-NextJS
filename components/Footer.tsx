import Link from "next/link";
import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdCall } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-4 py-6 mt-auto border-t-2 border-gray-700">
      <div className="max-w-7xl mx-auto text-center space-y-2">
        <p className="text-sm">
          Copyright © 2025 Ananthu M A. All rights reserved.
        </p>
        <p className="text-sm">
          Follow <Link href="/login">R</Link>EFIX GAR
          <Link href="/login">A</Link>GE. on social media!
        </p>
        <div className="flex justify-center items-center space-x-5 mt-2">
          <Link
            aria-label="Whatsapp"
            href={process.env.NEXT_PUBLIC_WHATSAPP_LINK as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-white hover:text-gray-400 text-2xl md:text-3xl" />
          </Link>
          <Link
            aria-label="Instagram"
            href={process.env.NEXT_PUBLIC_INSTA_LINK as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-white hover:text-gray-400 text-2xl md:text-3xl" />
          </Link>
          <Link
            aria-label="Email"
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL as string}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiMail className="text-white hover:text-gray-400 text-2xl md:text-3xl" />
          </Link>
          <Link
            aria-label="Phone"
            href={`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER as string}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdCall className="text-white hover:text-gray-400 text-2xl md:text-3xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
