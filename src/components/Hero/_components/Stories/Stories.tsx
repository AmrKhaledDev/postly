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
// ==========================================================================================
function Stories({ stories }: { stories: any[] }) {
  dayjs.extend(relativeTime);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewStory, setViewStory] = useState<object | null>(null);
  return (
    <Swiper slidesPerView={"auto"} spaceBetween={10} className="max-w-200">
      <SwiperSlide style={{ width: "144px" }}>
        <div
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer hover:scale-95 transition-css active:scale-90 relative shrink-0 bg-linear-to-b from-indigo-50 to-white h-45 shadow border border-dashed border-indigo-500 rounded-lg flex flex-col items-center justify-center"
        >
          <AiFillPlusCircle className="size-8 text-indigo-500 rounded-full" />
          <p>Create story</p>
        </div>
      </SwiperSlide>
      {stories.map((story) => (
        <SwiperSlide key={story.id} style={{ width: "144px" }}>
          <div
            style={{ backgroundColor: story.bg_color && story.bg_color }}
            onClick={() => setViewStory(story)}
            className="rounded-lg select-none cursor-pointer h-45 relative shadow flex items-center justify-center overflow-hidden shrink-0 group"
          >
            <Image
              src={story.userImage ? story.userImage : "/user.jpg"}
              width={50}
              height={50}
              className="size-8 z-10 rounded-full absolute top-2 left-2 border border-white"
              alt="user image"
            />
            {story.storyMedia ? (
              story.media_type === "image" ? (
                <Image
                  src={story.storyMedia}
                  alt="story image"
                  fill
                  className="object-cover"
                />
              ) : (
                <ReactPlayer
                  src={story.storyMedia}
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                />
              )
            ) : (
              <p className="text-white line-clamp-3 text-sm px-3">
                {story.storyText}
              </p>
            )}
            <p className="absolute bottom-1 right-1 text-white text-xs">
              {dayjs(story.date).fromNow()}
            </p>
            <span className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-css" />
          </div>
        </SwiperSlide>
      ))}
      {isModalOpen && (
        <CreateStoryModal
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
