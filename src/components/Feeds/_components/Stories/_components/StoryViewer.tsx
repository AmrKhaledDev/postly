"use client";
import { StoryType } from "@/lib/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import ReactPlayer from "react-player";
import DeleteStoryButton from "./DeleteStoryButton";

// =======================================================================================================
function StoryViewer({
  viewStory,
  setViewStory,
  userSessionId,
}: {
  viewStory: StoryType;
  setViewStory: Dispatch<SetStateAction<StoryType | null>>;
  userSessionId: string;
}) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setViewStory(null);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [viewStory, setViewStory]);

  const modalContent = (
    <div
      style={{
        backgroundColor:
          viewStory.storyBg && !viewStory.media ? viewStory.storyBg : "#000000",
      }}
      className="fixed inset-0 z-90 flex flex-col items-center justify-center"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-white/30 z-30">
        <div
          className="h-full bg-white transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="absolute top-3 left-0 z-40 flex items-center justify-between w-full px-3">
        <div className="flex items-center sm:px-6 px-3 py-1.5 gap-3 bg-black/45 text-white rounded ">
          <Image
            src={viewStory.user.image ? viewStory.user.image : "/user.jpg"}
            alt="user image"
            width={50}
            height={50}
            className="sm:size-10 size-8 rounded-full object-cover ring ring-white"
          />
          <h2 className="font-semibold capitalize hover:underline cursor-pointer sm:text-[15px] text-sm">
            {viewStory.user.name}
          </h2>
        </div>
        <button
          onClick={() => setViewStory(null)}
          className="md:text-2xl sm:text-xl text-white cursor-pointer sm:p-3 p-2 rounded-full bg-white/25 hover:bg-white/30 shadow z-50"
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        {viewStory.media ? (
          viewStory.mediaType === "image" ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={viewStory.media}
                alt="story image"
                width={900}
                height={900}
                className="max-h-screen w-auto object-contain rounded-md"
              />
            </div>
          ) : (
            <div className="h-screen w-full flex items-center justify-center px-1">
              <div className="sm:max-w-md w-full h-full">
                <ReactPlayer
                  src={viewStory.media}
                  width="100%"
                  height="100%"
                  playing
                  controls
                  className="object-contain"
                />
              </div>
            </div>
          )
        ) : (
          <div className="h-screen w-full flex items-center justify-center px-5">
            <p dir="auto" className="text-white text-2xl font-medium text-center">
              {viewStory.text}
            </p>
          </div>
        )}
      </div>

      {viewStory.userId === userSessionId && (
        <DeleteStoryButton storyId={viewStory.id} setViewStory={setViewStory} />
      )}
    </div>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
}

export default StoryViewer;
