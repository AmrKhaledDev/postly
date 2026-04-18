"use client";
import { CreatePostAction } from "@/lib/Actions/Create/CreatePost.action";
import { uploadMedia } from "@/lib/uplaodMedia";
import { User } from "@prisma/client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import ReactPlayer from "react-player";
import { FiPaperclip } from "react-icons/fi";
import { PostDbCacheType } from "@/lib/types";
import { EditPostAction } from "@/lib/Actions/Edit/EditPost.action";
import { useRouter } from "next/navigation";
// =========================================================================
function PostComposer({
  userSession,
  postEdit,
}: {
  userSession: User;
  postEdit?: PostDbCacheType;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(postEdit?.content || "");
  const [mediaPreview, setMediaPreview] = useState(postEdit?.media || "");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const isVideo = mediaFile
    ? !!mediaFile.type.startsWith("video")
      ? "video"
      : "image"
    : postEdit?.mediaType;
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
      if (!content && !mediaPreview)
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
      const result = postEdit
        ? await EditPostAction({
            postId: postEdit ? postEdit.id : "",
            content,
            media: media?.media || mediaPreview,
            mediaType: media?.mediaType,
          })
        : await CreatePostAction({
            content,
            userId: userSession.id,
            media: media?.media,
            mediaType: media?.mediaType,
          });
      if (!result.success)
        return toast.error(result.message, { className: "toast-font" });
      if (!postEdit) {
        setContent("");
        setMediaPreview("");
      }
      setMediaFile(null);
      toast.success(result.message, { className: "toast-font" });
      router.refresh();
    } catch (error) {
      console.log(error);
      return toast.error("Story creation/edit failed. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <textarea
          dir="auto"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="what's happeing?"
          className="w-full resize-none outline-none p-2 sm:h-30 h-40"
        />
        {mediaPreview && (
          <div className="relative">
            {isVideo && isVideo === "video" ? (
              <ReactPlayer
                controls
                width="100%"
                height="100%"
                src={mediaPreview}
              />
            ) : (
              <Image
                src={mediaPreview}
                width={500}
                height={500}
                className="object-cover w-100 max-h-110 mx-auto rounded-md"
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
          className="sm:text-2xl text-xl cursor-pointer text-slate-500 hover:text-black transition-css block"
        >
          <FiPaperclip />
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
          className="cursor-pointer sm:text-[15px] text-sm disabled:bg-gray-200 text-white not-disabled:bg-linear-to-r from-indigo-500 to-purple-500 rounded-md py-1.5 px-6 hover:scale-105 transition-css"
        >
          {loading ? (
            <span className="size-5 border-3 rounded-full animate-spin border-t-transparent block border-indigo-400" />
          ) : (
            "Publish Post"
          )}
        </button>
      </div>
    </>
  );
}

export default PostComposer;
