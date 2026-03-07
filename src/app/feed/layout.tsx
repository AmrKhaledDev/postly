import Sidebar from "@/components/Sidebar/Sidebar";
import { Metadata } from "next";
import React from "react";
// ==================================================================
export const metadata: Metadata = {
  title: "Postly | Feed",
  description:
    "Stay updated on Postly Feed—see posts from friends, explore trending ideas, and discover the latest news all in one place.",
};
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-indigo-50">
      <div className="max-w-425 flex gap-7 mx-auto">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

export default layout;
