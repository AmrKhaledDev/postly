"use client";
import { Message } from "@prisma/client";
import CreateMessage from "./CreateMessage";
import MessageDesign from "./MessageDesign";
import { useEffect, useState } from "react";
// ======================================================================
function Messages({
  messages,
  userSessionId,
  receiverId,
}: {
  messages: Message[];
  userSessionId: string;
  receiverId: string;
}) {
  const [dropDown, setDropDown] = useState("");
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".messageContent")) setDropDown("");
      }
    };
    document.addEventListener("click", handle);
    return () => {
      removeEventListener("click", handle);
    };
  }, []);
  return (
    <>
      <div className="h-152 overflow-y-auto overflow-x-hidden space-y-2">
        {messages.length > 0 &&
          messages.map((message) => (
            <MessageDesign
              dropDown={dropDown}
              setDropDown={setDropDown}
              key={message.id}
              message={message}
              userSessionId={userSessionId}
            />
          ))}
      </div>
      <CreateMessage userSessionId={userSessionId} receiverId={receiverId} />
    </>
  );
}

export default Messages;
