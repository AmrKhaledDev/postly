import { randomUUID } from "crypto";
import Image from "next/image";
import { FiImage } from "react-icons/fi";
import { LuSendHorizontal } from "react-icons/lu";
// ====================================================================================================================
function Chat() {
  const user = {
    id: randomUUID(),
    image:
      "https://i.pinimg.com/1200x/2c/e3/98/2ce398b6e5a2999258f2327bbbb72a73.jpg",
    name: "Mohammed Khaled",
    username: "@mohammed_khaled",
  };

  return (
    <main className="h-screen flex-1 space-y-5 pr-5">
      <div className="flex items-center gap-2 bg-white mx-auto shadow py-1.5 px-4 rounded-md mt-2 pl-35">
        <Image
          src={user.image ? user.image : "/user.jpg"}
          alt="user image"
          width={50}
          height={50}
          className="size-11 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-[18px] capitalize">{user.name}</h2>
          <h3 className="text-sm font-normal text-gray-500">{user.username}</h3>
        </div>
      </div>
      <div className="h-147.5 overflow-y-auto overflow-x-hidden space-y-2">
        <div className="space-y-2">
          <p className="p-2 bg-white w-fit shadow rounded-md rounded-bl-none font-semibold max-w-1/2">
            حسابي اتهكر بسببك
          </p>
          <p className="p-2 bg-white w-fit shadow rounded-md rounded-bl-none font-semibold max-w-1/2">
            منك لله ياريتني ما سجلت عندك
          </p>
        </div>
        <div className="flex justify-end">
          <p className="p-2 bg-indigo-500 text-white w-fit shadow rounded-md rounded-br-none text-end font-semibold max-w-1/2">
            يحبيبي مليش دعوه انا بالكلام دا{" "}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 h-12 border border-gray-200 rounded-full overflow-hidden bg-white max-w-150 mx-auto shadow">
        <input
          className="flex-1 bg-transparent h-full outline-none pl-4 text-gray-600"
          placeholder="Type a message..."
        />
        <div className="flex items-center gap-2 pr-1.5">
          <button className="text-2xl text-gray-400 cursor-pointer">
            <FiImage />
          </button>
          <button className="text-xl siz-5 rounded-full flex items-center justify-center bg-purple-500 cursor-pointer text-white p-1.5">
            <LuSendHorizontal />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Chat;
