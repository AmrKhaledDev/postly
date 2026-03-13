import Image from "next/image";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";
import revaltiveTime from "dayjs/plugin/relativeTime.js";
import Link from "next/link";
// =======================================================
dayjs.extend(revaltiveTime);
function RecentMessages() {
  const messages = [
    {
      id: randomUUID(),
      userImage:
        "https://i.pinimg.com/1200x/2c/e3/98/2ce398b6e5a2999258f2327bbbb72a73.jpg",
      userName: "Mohammed Khaled",
      message: "i seen your profile",
      date: new Date().getTime() - 10 * 60 * 1000,
      isSeen: false,
      userId: randomUUID(),
    },
    {
      id: randomUUID(),
      userImage:
        "https://i.pinimg.com/736x/af/ec/5f/afec5fd5f1b41e103947872f46669be6.jpg",
      userName: "Amr Mohammed",
      message: "Hi, How are you !",
      date: new Date().getTime() - 8 * 60 * 1000,
      isSeen: true,
      userId: randomUUID(),
    },
    {
      id: randomUUID(),
      userImage:
        "https://i.pinimg.com/736x/1d/f1/48/1df148bff017c65474e302ce4b0d3ec5.jpg",
      userName: "Yaser Ahmed",
      message: "Hello !",
      date: new Date().getTime() - 2 * 60 * 1000,
      isSeen: true,
      userId: randomUUID(),
    },
  ];
  return (
    <div className="bg-white p-3 rounded-md w-full space-y-5 ring ring-gray-200 sticky top-2">
      <h2 className="font-semibold">Recent Messages</h2>
      <ul className="space-y-2">
        {messages.map((message) => (
          <li key={message.id}>
            <Link
              href={`/feed/messages/${message.userId}`}
              className={`flex justify-between bg-gray-50 p-1.5 rounded relative hover:bg-indigo-100 transition-css
            ${!message.isSeen && "bg-indigo-50"}
            `}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={message.userImage ? message.userImage : "/user.jpg"}
                  alt="user image"
                  width={50}
                  height={50}
                  className="size-9 object-cover shrink-0 rounded-full"
                />
                <div className="w-full">
                  <h2 className="text-sm font-semibold">{message.userName}</h2>
                  <p className="text-gray-600 text-[13px]">{message.message}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <h3 className="text-xs text-gray-400 font-normal ">
                  {dayjs(message.date).fromNow()}
                </h3>
                {!message.isSeen && (
                  <p className=" bg-indigo-800 text-white rounded-full size-4 p-1 flex items-center justify-center font-semibold text-xs">
                    1
                  </p>
                )}
              </div>
              {!message.isSeen && (
                <div className="absolute -top-1 -left-1">
                  <span className="size-4 rounded-full block bg-white" />
                  <span className="size-2 rounded-full block bg-indigo-500 -translate-y-3 translate-x-1" />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentMessages;
