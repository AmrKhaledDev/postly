"use client";
import { MessageAction } from "@/lib/Actions/Create/Message.action";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuSendHorizontal } from "react-icons/lu";
// =========================================================================
function CreateMessage({
  userSessionId,
  receiverId,
}: {
  userSessionId: string;
  receiverId: string;
}) {
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [content]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCreateMessage = async () => {
    try {
      setLoading(true);
      if (!content?.trim())
        return toast.error("You cannot send an empty message", {
          className: "toast-font",
        });
      const result = await MessageAction({
        content,
        senderId: userSessionId,
        receiverId,
        type: "create",
      });
      if (!result.success)
        return toast.error(result.message || "Message failed to send", {
          className: "toast-font",
        });
      setContent("");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Message failed to send", { className: "toast-font" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-3 h-12 focus-within:ring-indigo-500 ring ring-transparent transition-css rounded-full overflow-hidden bg-white max-w-150 mx-auto shadow">
      <input
        ref={inputRef}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        dir="auto"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCreateMessage();
        }}
        className="flex-1 bg-transparent h-full outline-none pl-4 text-gray-600 cursor-pointer"
        placeholder="Type a message..."
      />

      <button
        onClick={handleCreateMessage}
        disabled={loading}
        className="text-xl disabled:cursor-default disabled:bg-gray-200 siz-5 rounded-full flex items-center justify-center bg-purple-500 cursor-pointer text-white p-1.5 mr-1.5"
      >
        <LuSendHorizontal />
      </button>
    </div>
  );
}

export default CreateMessage;
