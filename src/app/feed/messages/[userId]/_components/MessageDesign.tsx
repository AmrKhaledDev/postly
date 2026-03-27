"use client";
import { Message } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DropDown from "./DropDown";
import EditMessage from "./EditMessage";
// ===================================================================
function MessageDesign({
  message,
  userSessionId,
  dropDown,
  setDropDown,
  receiverId,
}: {
  message: Message;
  userSessionId: string;
  dropDown: string;
  setDropDown: Dispatch<SetStateAction<string>>;
  receiverId: string;
}) {
  const [editMessage, setEditMessage] = useState(false);
  return (
    <>
      <div
        key={message.id}
        className={`space-y-2 w-full ${message.senderId === userSessionId && "flex items-end flex-col pr-2"}`}
      >
        {dropDown === message.id && message.senderId === userSessionId && (
          <DropDown
            setEditMessage={setEditMessage}
            message={message}
            senderId={userSessionId}
            receiverId={receiverId}
          />
        )}
        <p
          dir="auto"
          onClick={() =>
            setDropDown((prev) => (prev === message.id ? "" : message.id))
          }
          className={`p-2 messageContent ${message.senderId === userSessionId && "cursor-pointer"} ${message.senderId === userSessionId ? "bg-indigo-500 rounded-br-none text-white" : "bg-white rounded-bl-none"} shadow lg:max-w-1/2 max-w-[70%] rounded-md font-semibold w-fit`}
        >
          {message.content}
        </p>
      </div>
      {editMessage && (
        <EditMessage
          senderId={userSessionId}
          receiverId={receiverId}
          message={message}
          editMessage={editMessage}
          setEditMessage={setEditMessage}
        />
      )}
    </>
  );
}

export default MessageDesign;
