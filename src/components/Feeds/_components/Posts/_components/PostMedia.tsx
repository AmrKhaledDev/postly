import Image from "next/image";
import ReactPlayer from "react-player";
// ==================================================
function PostMedia({post}:{post:any}) {
  return (
    <>
      {post.media && (
        <>
          {post.mediaType === "image" && (
            <Image
              src={post.media}
              alt="post media"
              width={600}
              height={600}
              className="w-full object-cover rounded max-h-100"
            />
          )}
          {post.mediaType === "video" && (
            <div className="w-full sm:h-100 h-60 rounded overflow-hidden">
              <ReactPlayer
                width="100%"
                height="100%"
                controls
                playing={false}
                src={post.media}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PostMedia;
