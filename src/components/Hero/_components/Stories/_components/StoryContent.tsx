"use client";

import Image from "next/image";
import { Dispatch, RefObject, SetStateAction } from "react";
// ==============================================
function StoryContent({
  mediaPreview,
  textareaRef,
  text,
  setText,
  storyBgColor,
}: {
  mediaPreview: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  storyBgColor: string;
}) {
  return (
    <div className="relative">
      {mediaPreview ? (
        <Image
          src={mediaPreview}
          alt="media"
          width={400}
          height={400}
          className="object-cover h-fit w-full max-h-107.5 rounded"
        />
      ) : (
        <textarea
          style={{ backgroundColor: storyBgColor }}
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          dir="auto"
          className="bg-transparent h-85 w-full font-semibold  outline-none p-4 resize-none rounded"
          placeholder="What's on your mind?"
        />
      )}
    </div>
  );
}

export default StoryContent;
