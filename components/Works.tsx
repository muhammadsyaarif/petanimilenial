import Link from "next/link";
import Image from "next/image";
import React from "react";

function Insight() {
  return (
    <>
        

      <div className="mx-6 sm:mx-[100px] h-auto mt-24 sm:mt-[200px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[40px] font-semibold">Pengairan Sawah Berbasis IOT</p>
          </div>
          <div>
            <Link
              href={"/all-projects"}
              className="hidden sm:block px-10 py-3 border border-green-500 rounded-full hover:bg-green-400"
            >
              MONITORING DATA DAN GRAFIK
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Insight;
