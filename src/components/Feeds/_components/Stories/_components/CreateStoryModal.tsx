"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PiStarFourBold } from "react-icons/pi";
import StoryContent from "./StoryContent";
import Colors from "./Colors";
import StoryContentTypeSelector from "./StoryContentTypeSelector";
import toast from "react-hot-toast";
import axios from "axios";
import { CreateStoryAction } from "@/lib/Actions/Create/CreateStory.action";
import Blur from "@/components/Blur/Blur";
import { useRouter } from "next/navigation";
import { uploadMedia } from "@/lib/uplaodMedia";
// ================================================================================
function CreateStoryModal({
  setIsModalOpen,
  isModalOpen,
  userId,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  userId: string;
}) {
  const bg_colors = [
    "#4f46e5",
    "#7c3aed",
    "#db2777",
    "#e11d48",
    "#ca8a04",
    "#0d9488",
  ];
  const [loading, setLoading] = useState(false);
  const [storyBgColor, setStoryBgColor] = useState(bg_colors[0]);
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
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
  const handleUploadStory = async () => {
    try {
      setLoading(true);
      if (text && mediaFile)
        return toast.error("The status cannot contain content and media", {
          className: "toast-font",
        });
      if (text.trim().length < 1 && !mediaFile)
        return toast.error("You cannot create an empty story", {
          className: "toast-font",
        });
      let media:
        | { error: string }
        | { media: string; mediaType: string }
        | null = null;
      if (mediaFile) {
        media = await uploadMedia(mediaFile, "stories-media");
      }
      if (media && "error" in media)
        return toast.error(media.error, { className: "toast-font" });
      const result = await CreateStoryAction({
        text,
        media: media?.media,
        mediaType: media?.mediaType,
        userId,
        storyBg: storyBgColor,
      });
      if (!result.success)
        return toast.error(result.message, { className: "toast-font" });
      setText("");
      setMediaFile(null);
      setIsModalOpen(false);
      setMediaPreview("");
      toast.success(result.message, { className: "toast-font" });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred story creation failed", {
        className: "toast-font",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/80 z-40 backdrop-blur flex items-center justify-center text-white">
      <div className="w-120 space-y-3 boxCreateStory relative">
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
          mediaFile={mediaFile}
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
        <button
          disabled={loading}
          onClick={handleUploadStory}
          className="w-full disabled:from-gray-200 disabled:to-gray-200 disabled:cursor-default disabled:scale-100 flex items-center hover:scale-102 transition-css gap-3 bg-linear-to-r from-indigo-500 to-purple-500 text-white py-3 justify-center rounded cursor-pointer font-bold"
        >
          {loading ? (
            <span className="size-6 border-2 rounded-full animate-spin border-t-transparent " />
          ) : (
            <>
              <PiStarFourBold size={18} /> Create Story
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CreateStoryModal;
