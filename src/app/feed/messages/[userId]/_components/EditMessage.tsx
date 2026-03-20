"use client";

import { MessageAction } from "@/lib/Actions/Create/Message.action";
import { Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
// ==================================================================
function EditMessage({
  message,
  editMessage,
  setEditMessage,
}: {
  message: Message;
  editMessage: boolean;
  setEditMessage: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [newContent, setNewContent] = useState(message.content);
  const [loading, setLoading] = useState(false);
  const handleEditMessage = async () => {
    if(newContent === message.content) return
    try {
      setLoading(true);
      if (!newContent?.trim())
        return toast.error("You cannot send an empty message", {
          className: "toast-font",
        });
      const result = await MessageAction({
        content: newContent,
        type: "edit",
        messageId: message.id,
      });
      if (!result.success)
        return toast.error(result.message || "Message failed to send", {
          className: "toast-font",
        });
      setNewContent("");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Message failed to send", { className: "toast-font" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur flex justify-end p-5">
      <button
        onClick={() => setEditMessage(false)}
        className="absolute active:scale-95 transition hover:scale-105 left-3 top-3 cursor-pointer text-4xl text-white rounded-full"
      >
        <IoIosCloseCircle />
      </button>
      <p className="w-fit max-w-1/2 p-2 bg-indigo-500 text-white rounded-md font-semibold h-fit text-xl">
        {message.content}
      </p>
      <div className="flex absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-3 h-12 focus-within:ring-indigo-300 ring ring-transparent transition-css rounded-full overflow-hidden bg-white w-150 shadow">
        <input
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEditMessage();
          }}
          disabled={loading}
          dir="auto"
          className="flex-1 bg-transparent h-full outline-none pl-4 text-gray-600 cursor-pointer"
          placeholder={`Edit message (${message.content.length > 30 ? message.content.slice(0, 30) + "...." : message.content})`}
        />

        <button
          onClick={handleEditMessage}
          disabled={loading}
          className="text-xl disabled:cursor-default disabled:bg-gray-200 siz-5 rounded-full flex items-center justify-center bg-green-500 cursor-pointer text-white p-1.5 mr-1.5"
        >
          <FiEdit2 />
        </button>
      </div>
    </div>
  );
}

export default EditMessage;
