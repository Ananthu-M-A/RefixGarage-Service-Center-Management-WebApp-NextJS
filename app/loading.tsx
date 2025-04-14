import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="transition animate-pulse">
      <Image src={`/logo.png`} alt={`Logo`} width={`250`} height={`250`} />
    </div>
  );
}

export default Loading;
