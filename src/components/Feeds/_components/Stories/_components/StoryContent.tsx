"use client";

import Image from "next/image";
import { Dispatch, RefObject, SetStateAction } from "react";
import ReactPlayer from "react-player";
// ==============================================
function StoryContent({
  mediaFile,
  mediaPreview,
  textareaRef,
  text,
  setText,
  storyBgColor,
}: {
  mediaFile: File | null;
  mediaPreview: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  storyBgColor: string;
}) {
  const isVideo = mediaFile?.type.startsWith("video");
  return (
    <div className="relative">
      {mediaPreview ? (
        isVideo ? (
          <ReactPlayer
            controls
            src={mediaPreview}
            width="100%"
            height="100%"
            className="rounded"
          />
        ) : (
          <Image
            src={mediaPreview}
            alt="media"
            width={400}
            height={400}
            className="object-cover h-fit w-full max-h-107.5 rounded"
          />
        )
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
