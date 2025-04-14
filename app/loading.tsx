import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center mt-20 transition animate-pulse">
      <Image src={`/logo.png`} alt={`Logo`} width={`250`} height={`250`} />
    </div>
  );
}

export default Loading;
