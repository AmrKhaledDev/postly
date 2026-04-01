import Image from "next/image";
import dayjs from "dayjs";
import revaltiveTime from "dayjs/plugin/relativeTime.js";
import Link from "next/link";
import { GetSession } from "@/lib/GetSession";
import { redirect } from "next/navigation";
// =======================================================
dayjs.extend(revaltiveTime);
async function RecentMessages() {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  const filteredMessages = new Map();
  const messages = userSession.receivedMessages;
  for (const message of messages) {
    if (!filteredMessages.has(message.senderId)) {
      filteredMessages.set(message.senderId, message);
    }
  }
  const finalyMessages = Array.from(filteredMessages.values());
  return (
    <>
      {finalyMessages.length > 0 && (
        <div className="bg-white p-3 rounded-md w-full space-y-5 ring ring-gray-200 sticky top-2">
          <h2 className="font-semibold">Recent Messages</h2>
          <ul className="space-y-2">
            {finalyMessages.map((message) => (
              <li key={message.id}>
                <Link
                  href={`/feed/messages/${message.sender.id}`}
                  className={`flex justify-between bg-gray-50 p-1.5 rounded relative hover:bg-indigo-100 transition-css
         
            `}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={
                        message.sender.image
                          ? message.sender.image
                          : "/user.jpg"
                      }
                      alt="user image"
                      width={50}
                      height={50}
                      className="size-9 object-cover shrink-0 rounded-full"
                    />
                    <div className="w-full">
                      <h2 className="text-sm font-semibold line-clamp-1 capitalize">
                        {message.sender.name}
                      </h2>
                      <p className="text-gray-600 text-[13px]">
                        {message.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <h3 className="text-[10px] text-gray-400 font-normal ">
                      {dayjs(message.createdAt).fromNow()}
                    </h3>
                    {/* {!message.isSeen && (
                  <p className=" bg-indigo-800 text-white rounded-full size-4 p-1 flex items-center justify-center font-semibold text-xs">
                    1
                  </p>
                )} */}
                  </div>
                  {/* {!message.isSeen && (
                <div className="absolute -top-1 -left-1">
                  <span className="size-4 rounded-full block bg-white" />
                  <span className="size-2 rounded-full block bg-indigo-500 -translate-y-3 translate-x-1" />
                </div>
              )} */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default RecentMessages;
