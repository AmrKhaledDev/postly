"use client";

import { Dispatch, SetStateAction } from "react";
// =============================================================================================
function Colors({
  setStoryBgColor,
  storyBgColor,
  bg_colors,
}: {
  setStoryBgColor: Dispatch<SetStateAction<string>>;
  storyBgColor: string;
  bg_colors: string[];
}) {
  return (
    <div className="space-x-1.5">
      {bg_colors.map((color, index) => (
        <button
          onClick={() => setStoryBgColor(color)}
          style={{ backgroundColor: color }}
          className={`size-6 ring cursor-pointer ${storyBgColor === color && "ring-2"}`}
          key={index}
        />
      ))}
    </div>
  );
}

export default Colors;
