import React from "react";
import Link from "next/link";

function About() {
  return (
    <>
      <div className="mx-6 sm:mx-[100px] h-auto mt-24">
        <div>
          <p className="text-5xl lg:text-[70px] text-center lg:text-justify font-semibold leading-tight">
          Design of an IoT-based automatic rice field irrigation system.
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-[200px] mt-6">
            <p className="text-base justify-center lg:text-justify">
              Expanding my web and IoT development business, while ensuring
              standout digital presence.
            </p>
            <div className="flex justify-center items-end gap-10">
              <Link href={"https://www.instagram.com/syrf_16/"}>Instagram</Link>
              <Link
                href={`mailto:syrf253@gmail.com?subject=Hi Muhammad Syarif&body=Perkenalkan nama saya `}
              >
                Email
              </Link>
              <Link href={"https://wa.me/6287844232534"}>WhatsApp</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
