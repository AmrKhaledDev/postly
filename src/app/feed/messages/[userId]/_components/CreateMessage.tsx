"use client";
import { MessageAction } from "@/lib/Actions/Create/Message.action";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuSendHorizontal } from "react-icons/lu";
// ========================================================
function CreateMessage({
  userSessionId,
  receiverId,
}: {
  userSessionId: string;
  receiverId: string;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleCreateMessage = async () => {
    if (!content?.trim()) {
      return toast.error("You cannot send an empty message", {
        className: "toast-font",
      });
    }
    try {
      setLoading(true);
      const result = await MessageAction({
        content: content.trim(),
        senderId: userSessionId,
        receiverId,
        type: "create",
      });
      if (!result.success) {
        return toast.error(result.message || "Message failed to send", {
          className: "toast-font",
        });
      }
      setContent("");
      inputRef.current?.focus();
    } catch (error) {
      console.error(error);
      toast.error("Message failed to send", { className: "toast-font" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-3 h-12 focus-within:ring-indigo-300 ring ring-transparent transition-all duration-200 rounded-full overflow-hidden bg-white max-w-150 mx-auto shadow focus-within:max-w-170">
      <input
        ref={inputRef}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        dir="auto"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) handleCreateMessage();
        }}
        className="flex-1 bg-transparent h-full outline-none pl-4 text-gray-600"
        placeholder="Type a message..."
        disabled={loading}
      />
      <button
        onClick={handleCreateMessage}
        disabled={loading || !content.trim()}
        className="text-xl disabled:cursor-not-allowed disabled:bg-gray-300 rounded-full flex items-center justify-center bg-purple-500 cursor-pointer text-white p-1.5 mr-1.5 transition-colors"
      >
        <LuSendHorizontal className={`${loading ? "animate-pulse" : ""}`} />
      </button>
    </div>
  );
}

export default CreateMessage;