import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
// ============================================================
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
// ================================================================
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob;
  const pathname = formData.get("pathname");
  if (!(file instanceof File))
    return NextResponse.json(
      {
        error: "The one you uploaded has an unsupported type.",
      },
      { status: 400 },
    );
  const isVideo = file.type.startsWith("video/");
  if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }
  if (!isVideo && file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Image too large" }, { status: 400 });
  }
  if (isVideo && file.size > MAX_VIDEO_SIZE) {
    return NextResponse.json({ error: "Video too large" }, { status: 400 });
  }
  if (typeof pathname !== "string")
    return NextResponse.json({ error: "Video/Image upload failed" });
  try {
    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64}`,
      {
        folder: pathname as string,
        resource_type: isVideo ? "video" : "image",
      },
    );
    return NextResponse.json({
      media: result.secure_url,
      mediaType: isVideo ? "video" : "image",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Video/Image upload failed" },
      { status: 500 },
    );
  }
}
