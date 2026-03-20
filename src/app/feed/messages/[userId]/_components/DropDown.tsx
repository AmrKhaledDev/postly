"use client";

import { DeleteMessageAction } from "@/lib/Actions/Delete/DeleteMessage.action";
import { Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
// ==================================================================
function DropDown({
  setEditMessage,
  message,
}: {
  setEditMessage: Dispatch<SetStateAction<boolean>>;
  message: Message;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDeleteMessage = async () => {
    setLoading(true);
    const result = await DeleteMessageAction(message.id);
    setLoading(false);
    if (!result.success && result.message)
      return toast.error(result.message, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div className=" bg-white w-fit p-1 rounded-full flex items-center gap-1 shadow">
      <button
        disabled={loading}
        onClick={() => {
          setEditMessage(true);
        }}
        className="cursor-pointer active:text-white active:bg-indigo-500 active:scale-90 text-xl text-gray-500 transition-css hover:text-white p-1.5 rounded-full hover:bg-indigo-500"
      >
        <MdEdit />
      </button>
      <button
        disabled={loading}
        onClick={handleDeleteMessage}
        className="cursor-pointer text-xl transition-css  active:text-white active:bg-red-500 active:scale-90 text-gray-500 hover:text-white hover:bg-red-500 p-1.5 rounded-full"
      >
        <MdDelete />
      </button>
    </div>
  );
}

export default DropDown;
