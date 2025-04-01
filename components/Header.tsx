import React from "react";
import Image from "next/image";

function Header() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black">
      <div className="flex flex-col text-center p-4 text-white">
        <h2 className="text-sm text-white">SUN - SAT</h2>
        <h3 className="text-sm text-white">9:30AM - 9:30PM</h3>
      </div>
      <div className="flex items-center flex-shrink-0 text-white">
        <Image
          src="/logo.png"
          alt="Logo"
          width={75}
          height={75}
          className="shadow-lg"
          loading="lazy"
        />
        <h1 className="text-4xl font-bold">REFIX GARAGE</h1>
      </div>
      <div className="flex flex-col text-center p-4 text-white">
        <h2 className="text-sm text-white">refixgarage@gmail.com</h2>
        <h3 className="text-sm text-white">+91 623 889 9623</h3>
      </div>
      {/* <div className="flex space-x-4 mx-4">
        <Button className="bg-transparent hover:bg-gray-700">Services</Button>
        <Button className="bg-transparent hover:bg-gray-700">About</Button>
        <Button className="bg-transparent hover:bg-gray-700">Contact</Button>
      </div> */}
    </nav>
  );
}

export default Header;
