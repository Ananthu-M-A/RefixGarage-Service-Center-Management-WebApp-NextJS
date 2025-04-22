import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center mt-20 space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      <Image
        src={`/logo.png`}
        alt={`Logo`}
        width={200}
        height={200}
        className="animate-pulse"
        loading="lazy"
      />
      <p className="text-gray-500 text-sm animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
}

export default Loading;
