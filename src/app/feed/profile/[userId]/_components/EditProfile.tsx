"use client";
import { FaRegEdit } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { IoMdPhotos } from "react-icons/io";
import { useState } from "react";
// ==================================================================
function EditProfile() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  return (
    <>
      <button onClick={()=>setIsEditProfile(true)} className="flex items-center border absolute top-3 right-3 border-gray-100 rounded-md py-2 px-4 font-semibold text-slate-500 hover:shadow transition-css cursor-pointer gap-1.5">
        <FaRegEdit size={20} /> Edit
      </button>
      {isEditProfile && (
        <div className="inset-0 fixed bg-black/25 backdrop-blur z-50">
          <div className="bg-white w-2xl shadow p-5 mx-auto mt-6 rounded-md space-y-5 overflow-auto max-h-175">
            <h1 className="font-extrabold text-2xl">Edit Profile</h1>
            <div className="space-y-1">
              <h2 className="font-semibold">Profile Picture</h2>
              <div
                className="size-30 bg-linear-to-r from-indigo-300 to-purple-300 shadow rounded-full hover:from-indigo-400 hover:to-purple-400 transition-css
            "
              >
                <label
                  htmlFor=""
                  className="w-full h-full flex items-center justify-center text-2xl text-white cursor-pointer"
                >
                  <LuPencil />
                </label>
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="font-semibold">Cover Photo</h2>
              <div
                className="w-100 h-50  rounded-md bg-linear-to-r from-indigo-300 to-pink-300 shadow hover:from-indigo-400 hover:to-pink-400 transition-css
            "
              >
                <label
                  htmlFor=""
                  className="w-full h-full flex items-center justify-center text-4xl text-white cursor-pointer"
                >
                  <IoMdPhotos />
                </label>
              </div>
            </div>
            <form className="space-y-4 font-semibold text-slate-700">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 py-2 px-3 font-medium rounded-md outline-none focus:border-indigo-500 transition-css"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  id="username"
                  className="border border-gray-300 py-2 px-3 font-medium rounded-md outline-none focus:border-indigo-500 transition-css"
                  placeholder="Enter user name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="bio">Bio</label>
                <input
                  type="text"
                  id="bio"
                  className="border border-gray-300 py-2 px-3 font-medium rounded-md outline-none focus:border-indigo-500 transition-css"
                  placeholder="Add Bio"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  className="border border-gray-300 py-2 px-3 font-medium rounded-md outline-none focus:border-indigo-500 transition-css"
                  placeholder="Enter your location"
                />
              </div>
              <div className="space-x-4 mt-10">
                <button className="text-white bg-linear-to-r from-indigo-500 to-purple-500 cursor-pointer hover:scale-105 active:scale-95 transition-css py-2 px-4 rounded-md">
                  Save Changes
                </button>
                <button onClick={()=>setIsEditProfile(false)} className="text-gray-500 border border-gray-300 active:scale-95 transition-css hover:scale-105 rounded-md cursor-pointer py-2 px-6">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
