"use client";
import { CreatePostAction } from "@/lib/Actions/Create/CreatePost.action";
import { uploadMedia } from "@/lib/uplaodMedia";
import { User } from "@prisma/client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { FiImage } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import ReactPlayer from "react-player";
// =========================================================================
function PostComposer({ userSession }: { userSession: User }) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const isVideo = !!mediaFile?.type.startsWith("video");
  const changeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaPreview(URL.createObjectURL(file));
      setMediaFile(file);
      e.target.value = "";
    }
  };
  const handleCreatePost = async () => {
    setLoading(true);
    try {
      if (!content && !mediaFile)
        return toast.error("You cannot create an empty post", {
          className: "toast-font",
        });
      let media:
        | { error: string }
        | { media: string; mediaType: string }
        | null = null;
      if (mediaFile) {
        media = await uploadMedia(mediaFile, "posts-media");
      }
      if (media && "error" in media)
        return toast.error(media.error, { className: "toast-font" });
      const result = await CreatePostAction({
        content,
        userId: userSession.id,
        media: media?.media,
        mediaType: media?.mediaType,
      });
      if (!result.success)
        return toast.error(result.message, { className: "toast-font" });
      setContent("");
      setMediaPreview("");
      setMediaFile(null);
      toast.success(result.message, { className: "toast-font" });
    } catch (error) {
      console.log(error);
      return toast.error("Story creation failed. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="what's happeing?"
          className="w-full resize-none outline-none p-2"
        />
        {mediaPreview && (
          <div className="relative">
            {isVideo ? (
              <ReactPlayer controls width="100%" height="100%" src={mediaPreview} />
            ) : (
              <Image
                src={mediaPreview}
                width={500}
                height={500}
                className="object-cover w-full max-h-60 rounded-md"
                alt="asf"
              />
            )}
            <button
              onClick={() => {
                setMediaFile(null);
                setMediaPreview("");
              }}
              className="text-xl cursor-pointer text-white p-1 rounded-full bg-red-500 absolute left-2 top-2 shadow"
            >
              <IoCloseOutline />
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-t-gray-200 pt-3">
        <label
          htmlFor="media"
          className="text-2xl cursor-pointer text-slate-500 hover:text-black transition-css block"
        >
          <FiImage />
        </label>

        <input
          disabled={loading}
          onChange={changeEvent}
          type="file"
          hidden
          id="media"
          className="hidden"
          accept="image/*, video/*"
        />
        <button
          onClick={handleCreatePost}
          disabled={loading}
          className="cursor-pointer disabled:bg-gray-200 text-white not-disabled:bg-linear-to-r from-indigo-500 to-purple-500 rounded-md py-1.5 px-6 hover:scale-105 transition-css"
        >
          {loading ? (
            <span className="size-5 border-3 rounded-full animate-spin border-t-transparent block " />
          ) : (
            " Publish Post"
          )}
        </button>
      </div>
    </>
  );
}

export default PostComposer;
