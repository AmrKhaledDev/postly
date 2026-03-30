"use client";
import Image from "next/image";
import { AiFillPlusCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { useState } from "react";
import CreateStoryModal from "./_components/CreateStoryModal";
import StoryViewer from "./_components/StoryViewer";
import ReactPlayer from "react-player";
import { StoryType } from "@/lib/types";
// ==========================================================================================
function Stories({
  stories,
  userId,
}: {
  stories: StoryType[];
  userId: string;
}) {
  dayjs.extend(relativeTime);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewStory, setViewStory] = useState<StoryType | null>(null);
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={8}
      className="w-full"
    >
      <SwiperSlide className="sm:max-w-36! max-w-25!">
        <div
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer hover:scale-95 transition-css active:scale-90 relative shrink-0 bg-linear-to-b from-indigo-50 to-white sm:h-45 h-35 shadow border border-dashed border-indigo-500 rounded-lg flex flex-col items-center justify-center"
        >
          <AiFillPlusCircle className="sm:size-8 size-6 text-indigo-500 rounded-full" />
          <p className="sm:text-[15px] text-sm">Create story</p>
        </div>
      </SwiperSlide>
      {stories.map((story) => (
        <SwiperSlide key={story.id} className="sm:max-w-36! max-w-25!">
          <div
            style={{
              backgroundColor:
                story.storyBg && !story.media ? story.storyBg : "#000000",
            }}
            onClick={() => setViewStory(story)}
            className="rounded-lg select-none cursor-pointer sm:h-45 h-35 relative shadow flex items-center justify-center overflow-hidden shrink-0 group"
          >
            <Image
              src={story.user.image ? story.user.image : "/user.jpg"}
              width={50}
              height={50}
              className="size-8 z-10 rounded-full absolute top-2 left-2 border border-white object-cover"
              alt="user image"
            />
            {story.media ? (
              story.mediaType === "image" ? (
                <Image
                  src={story.media}
                  alt="story image"
                  fill
                  className="object-cover"
                />
              ) : (
                <ReactPlayer
                  src={story.media}
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                />
              )
            ) : (
              <p dir="auto" className="text-white line-clamp-3 text-sm px-3 text-center">
                {story.text}
              </p>
            )}
            <p className="absolute bottom-1 right-1 text-white sm:text-xs text-[11px]">
              {dayjs(story.createdAt).fromNow()}
            </p>
            <span className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-css" />
          </div>
        </SwiperSlide>
      ))}
      {isModalOpen && (
        <CreateStoryModal
          userId={userId}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
      {viewStory && (
        <StoryViewer userSessionId={userId} viewStory={viewStory} setViewStory={setViewStory} />
      )}
    </Swiper>
  );
}

export default Stories;
