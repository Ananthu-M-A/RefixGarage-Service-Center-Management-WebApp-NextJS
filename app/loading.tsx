import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-opacity-75 mb-6"></div>
      <Image
        src={`/logo.png`}
        alt={`Logo`}
        width={150}
        height={150}
        className="animate-bounce"
        priority={true}
      />
      <p className="text-gray-400 text-lg font-medium mt-4 animate-pulse">
        Please wait, we’re getting things ready for you...
      </p>
    </div>
  );
}

export default Loading;
