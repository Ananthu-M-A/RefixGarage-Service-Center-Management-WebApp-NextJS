import Link from "next/link";
import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdCall } from "react-icons/md";

function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white p-4 mt-auto border-t-2 border-gray-700">
      <p className="text-center">© 2025 REFIX GARAGE. All rights reserved.</p>
      <p className="text-center">Follow us on social media!</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link
          href="https://wa.me/+916238899623"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-white hover:text-gray-400 text-4xl" />
        </Link>
        <Link
          href="https://www.instagram.com/refixgarage/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-white hover:text-gray-400 text-4xl" />
        </Link>
        <Link
          href={`mailto:refixgarage@gmail.com`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiMail className="text-white hover:text-gray-400 text-4xl" />
        </Link>
        <Link
          href={`mailto:refixgarage@gmail.com`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdCall className="text-white hover:text-gray-400 text-4xl" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
