import Link from "next/link";
import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdCall } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-4 py-6 mt-auto border-t-2 border-gray-700">
      <div className="max-w-7xl mx-auto text-center space-y-2">
        <p className="text-sm">© 2025 REFIX GARAGE. All rights reserved.</p>
        <p className="text-sm">Follow us on social media!</p>
        <div className="flex justify-center items-center space-x-5 mt-2">
          <Link href="https://wa.me/+916238855623" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-white hover:text-gray-400 text-2xl md:text-3xl" />
          </Link>
          <Link href="https://www.instagram.com/refix_garage/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-gray-400 text-2xl md:text-3xl" />
          </Link>
          <Link href="mailto:refixgarage@gmail.com" target="_blank" rel="noopener noreferrer">
            <FiMail className="text-white hover:text-gray-400 text-2xl md:text-3xl" />
          </Link>
          <Link href="tel:+916238855623" target="_blank" rel="noopener noreferrer">
            <MdCall className="text-white hover:text-gray-400 text-2xl md:text-3xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
