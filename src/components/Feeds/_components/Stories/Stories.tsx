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
    <Swiper slidesPerView={"auto"} spaceBetween={10} className="flex-1">
      <SwiperSlide style={{ maxWidth: "144px" }}>
        <div
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer hover:scale-95 transition-css active:scale-90 relative shrink-0 bg-linear-to-b from-indigo-50 to-white h-45 shadow border border-dashed border-indigo-500 rounded-lg flex flex-col items-center justify-center"
        >
          <AiFillPlusCircle className="size-8 text-indigo-500 rounded-full" />
          <p>Create story</p>
        </div>
      </SwiperSlide>
      {stories.map((story) => (
        <SwiperSlide key={story.id} style={{ maxWidth: "144px" }}>
          <div
            style={{ backgroundColor: story.storyBg && !story.media ? story.storyBg : "#000000" }}
            onClick={() => setViewStory(story)}
            className="rounded-lg select-none cursor-pointer h-45 relative shadow flex items-center justify-center overflow-hidden shrink-0 group"
          >
            <Image
              src={story.user.image ? story.user.image : "/user.jpg"}
              width={50}
              height={50}
              className="size-8 z-10 rounded-full absolute top-2 left-2 border border-white"
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
              <p className="text-white line-clamp-3 text-sm px-3">
                {story.text}
              </p>
            )}
            <p className="absolute bottom-1 right-1 text-white text-xs">
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
        <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
      )}
    </Swiper>
  );
}

export default Stories;
