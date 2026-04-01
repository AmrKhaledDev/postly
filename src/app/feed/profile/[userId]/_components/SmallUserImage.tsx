"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
// ======================================
function SmallUserImage({ user }: { user: User }) {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <Image
        onClick={() => setFocus(true)}
        src={user.image || "/user.jpg"}
        alt="profile image"
        width={150}
        height={150}
        className="rounded-full cursor-pointer shrink-0 lg:size-30 sm:size-25 size-20 sm:ml-5 ml-2 ring-3 ring-white sm:-mt-13 -mt-11 shadow-2xl object-cover bg-white"
      />
      {focus && (
        <div
          onClick={() => setFocus(false)}
          className="bg-black/45 backdrop-blur fixed inset-0 h-screen z-60 flex items-center justify-center"
        >
          <Image
            src={user.image || "/user.jpg"}
            alt="profile image"
            width={440}
            height={440}
            className="rounded-full shrink-0 lg:size-110 md:size-100 sm:size-90 size-70 shadow-2xl object-cover bg-black"
          />
        </div>
      )}
    </>
  );
}

export default SmallUserImage;
