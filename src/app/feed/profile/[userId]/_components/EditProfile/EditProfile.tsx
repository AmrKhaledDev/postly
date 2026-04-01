"use client";
import { Dispatch, SetStateAction, useState } from "react";
import FormEditProfile from "./_components/FormEditProfile";
import ProfilePicture from "./_components/ProfilePicture";
import CoverEdit from "./_components/CoverEdit";
import { User } from "@prisma/client";
import Blur from "@/components/Blur/Blur";
// ==================================================================
function EditProfile({
  userSession,
  setIsEditProfile,
}: {
  userSession: User;
  setIsEditProfile: Dispatch<SetStateAction<boolean>>;
}) {
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    userSession.image || "",
  );
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null,
  );
  const [coverPreview, setCoverPreview] = useState(userSession.cover || "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="inset-0 fixed bg-black/25 backdrop-blur z-50 px-5">
      <div className="bg-white md:w-2xl w-full relative shadow sm:p-5 p-3 mx-auto mt-6 rounded-md space-y-5 overflow-auto md:max-h-175 max-h-160">
        <h1 className="font-extrabold sm:text-2xl text-xl">Edit Profile</h1>
        <ProfilePicture
          profilePicturePreview={profilePicturePreview}
          setProfilePicturePreview={setProfilePicturePreview}
          setProfilePictureFile={setProfilePictureFile}
        />
        <CoverEdit
          setCoverFile={setCoverFile}
          setCoverPreview={setCoverPreview}
          coverPreview={coverPreview}
        />
        <FormEditProfile
          loading={loading}
          setLoading={setLoading}
          user={userSession}
          profilePictureFile={profilePictureFile}
          coverFile={coverFile}
          setIsEditProfile={setIsEditProfile}
        />
      </div>
      {loading && <Blur />}
    </div>
  );
}

export default EditProfile;
