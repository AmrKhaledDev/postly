"use client";
import { Message } from "@prisma/client";
import CreateMessage from "./CreateMessage";
import MessageDesign from "./MessageDesign";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusherClient";
// ================================================
interface MessagesProps {
  messages: Message[];
  userSessionId: string;
  receiverId: string;
}

function Messages({
  messages: initialMessages,
  userSessionId,
  receiverId,
}: MessagesProps) {
  const [dropDown, setDropDown] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const room = [userSessionId, receiverId].sort().join("_");
  useEffect(() => {
    const channel = pusherClient.subscribe(room);
    channel.bind("new-message", (newMessage: Message) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
    });
    channel.bind("update-message", (updatedMessage: Message) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === updatedMessage.id ? updatedMessage : m)),
      );
    });
    channel.bind("delete-message", (deleteMessage: Message) => {
      setMessages((prev) => prev.filter((m) => m.id !== deleteMessage.id));
    });
    return () => {
      pusherClient.unsubscribe(room);
    };
  }, [room]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".messageContent")) setDropDown("");
      }
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle); // تصحيح بسيط هنا بإضافة document
    };
  }, []);

  return (
    <>
      <div className="h-152 overflow-y-auto overflow-x-hidden space-y-2 no-scrollbar">
        {messages.length > 0 &&
          messages.map((message) => (
            <MessageDesign
              dropDown={dropDown}
              setDropDown={setDropDown}
              key={message.id}
              message={message}
              userSessionId={userSessionId}
              receiverId={receiverId}
            />
          ))}
      </div>
      <CreateMessage userSessionId={userSessionId} receiverId={receiverId} />
    </>
  );
}

export default Messages;
