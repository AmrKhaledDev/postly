import axios from "axios";
// ==========================================================================
export async function uploadMedia(mediaFile: File, pathname: string) {
  if (!mediaFile && !pathname) return { error: "Image/Video upload failed" };
  const formData = new FormData();
  formData.append("file", mediaFile);
  formData.append("pathname", pathname);
  const res = await axios.post("/api/upload-media-story", formData);
  return res.data;
}
