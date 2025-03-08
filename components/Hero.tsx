import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <>
      <div className="mx-6 sm:mx-[100px] h-auto">
        <p className="text-[21px] font-medium mt-4 sm:mt-[64px]">
          Monitoring Pengairan Sawah.
        </p>
        <p className="text-6xl lg:text-8xl font-semibold mt-4 tracking-tight">
          DEVELOPING AGRICULTURAL IOT ,{" "}
          <span className="text-[#32CD32]">TOWARDS GOLDEN INDONESIA</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-14 sm:gap-0 justify-between items-center mt-16 sm:mt-24">
          <div>
            <Link
              href={"https://t.me/Perrtani_bot"}
              className="px-[30px] lg:px-10 py-6 border border-black rounded-full bg-[#030712] text-white text-2xl font-medium hover:bg-[#32CD32] hover:text-black"
            >
              KONTROL &apos;TELEGRAM
            </Link>
          </div>
          <div className="max-w-md lg:max-w-xl">
            <p className="lg:text-xl text-justify">
              Computer Science student at UDB Surakarta, focusing on
              programming, web development, and IoT.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
