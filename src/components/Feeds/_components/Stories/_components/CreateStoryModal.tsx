"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PiStarFourBold } from "react-icons/pi";
import StoryContent from "./StoryContent";
import Colors from "./Colors";
import StoryContentTypeSelector from "./StoryContentTypeSelector";
// ================================================================================
function CreateStoryModal({
  setIsModalOpen,
  isModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
}) {
  const bg_colors = [
    "#4f46e5",
    "#7c3aed",
    "#db2777",
    "#e11d48",
    "#ca8a04",
    "#0d9488",
  ];
  const [storyBgColor, setStoryBgColor] = useState(bg_colors[0]);
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, [isModalOpen, !mediaPreview]);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".boxCreateStory")) setIsModalOpen(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-black/80 z-40 backdrop-blur flex items-center justify-center text-white">
      <div className="w-120 space-y-3 boxCreateStory">
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() => setIsModalOpen(false)}
            className="cursor-pointer text-xl"
          >
            <FaArrowLeft />
          </button>
          <p className="text-xl font-semibold">Create story</p>
        </div>
        <StoryContent
          mediaPreview={mediaPreview}
          storyBgColor={storyBgColor}
          text={text}
          textareaRef={textareaRef}
          setText={setText}
        />
        {(!mediaFile || !mediaPreview) && (
          <Colors
            setStoryBgColor={setStoryBgColor}
            storyBgColor={storyBgColor}
            bg_colors={bg_colors}
          />
        )}
        <StoryContentTypeSelector
          setMediaFile={setMediaFile}
          setMediaPreview={setMediaPreview}
          textareaRef={textareaRef}
        />
        <button className="w-full flex items-center hover:scale-102 transition-css gap-3 bg-linear-to-r from-indigo-500 to-purple-500 text-white py-3 justify-center rounded cursor-pointer font-bold">
          <PiStarFourBold size={18} />
          Create Story
        </button>
      </div>
    </div>
  );
}

export default CreateStoryModal;
