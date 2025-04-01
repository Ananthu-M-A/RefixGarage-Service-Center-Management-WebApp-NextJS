import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white p-4 mt-auto">
      <p className="text-center">© 2025 REFIX GARAGE. All rights reserved.</p>
      <p className="text-center">Follow us on social media!</p>
      <div className="flex justify-center space-x-4 mt-2">
        <FaInstagram className="text-white hover:text-gray-400" />
        <FaYoutube className="text-white hover:text-gray-400" />
        <FaWhatsapp className="text-white hover:text-gray-400" />
      </div>
    </footer>
  );
}

export default Footer;
