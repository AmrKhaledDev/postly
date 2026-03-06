import Feeds from "@/components/Hero/Hero";
import RightSide from "@/components/RIghtSide/RightSide";
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
    <div className="flex gap-10 bg-indigo-50 justify-between">
      <Sidebar />
      <Feeds />
      <RightSide />
    </div>
  );
}

export default layout;
