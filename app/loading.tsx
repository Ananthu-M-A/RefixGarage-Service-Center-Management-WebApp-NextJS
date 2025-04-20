import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center mt-20 transition animate-pulse">
      <Image src={`/logo.png`} alt={`Logo`} width={`500`} height={`500`} />
    </div>
  );
}

export default Loading;
