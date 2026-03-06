"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
// ===============================================================
function ButtonSignOut() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      router.refresh()
    } catch (error) {
      setLoading(false)
      toast.error("Logout failed", { className: "toast-font" });
    }
  };
  return (
    <button
      disabled={loading}
      onClick={handleSignOut}
      className="text-red-400 disabled:cursor-default text-xl cursor-pointer hover:text-red-500 transition-css"
    >
      {loading ? (
        <div className="size-5 rounded-full border-3 border-red-400 border-t-transparent animate-spin" />
      ) : (
        <FaSignOutAlt />
      )}
    </button>
  );
}

export default ButtonSignOut;
