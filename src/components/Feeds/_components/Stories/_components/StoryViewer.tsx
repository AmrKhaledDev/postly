"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReactPlayer from "react-player";
// =======================================================================================================
function StoryViewer({
  viewStory,
  setViewStory,
}: {
  viewStory: any;
  setViewStory: any;
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
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
  }, [viewStory,setViewStory]);
  return (
    <div
      style={{
        backgroundColor: viewStory.bg_color ? viewStory.bg_color : "#000000",
      }}
      className="fixed inset-0 z-50"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-white/30 z-30">
        <div
          className="h-full bg-white transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center gap-3 bg-black/45 py-2 px-6 text-white rounded absolute top-3 left-4 z-30">
        <Image
          src={viewStory.userImage ? viewStory.userImage : "/user.jpg"}
          alt="user image"
          width={50}
          height={50}
          className="size-10 rounded-full object-cover ring ring-white"
        />
        <h2 className="font-semibold capitalize hover:underline cursor-pointer">
          {viewStory.userName}
        </h2>
      </div>
      <button
        onClick={() => setViewStory(null)}
        className="text-2xl text-white cursor-pointer p-3 rounded-full bg-white/25 hover:bg-white/30 shadow absolute top-4 right-4 z-30"
      >
        <AiOutlineClose />
      </button>
      {viewStory.storyMedia ? (
        viewStory.media_type === "image" ? (
          <Image
            src={viewStory.storyMedia}
            alt="story image"
            width={600}
            height={600}
            className="object-cover w-110 mx-auto h-screen"
          />
        ) : (
          <div className="max-w-105 mx-auto h-screen">
            <ReactPlayer
              src={viewStory.storyMedia}
              width="100%"
              height="100%"
              controls
              className="object-cover"
            />
          </div>
        )
      ) : (
        <div className="h-screen w-full flex items-center justify-center px-5">
          <p className="text-white text-2xl">{viewStory.storyText}</p>
        </div>
      )}
    </div>
  );
}

export default StoryViewer;
