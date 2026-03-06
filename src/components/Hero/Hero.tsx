import { randomUUID } from "node:crypto";
import Posts from "./_components/Posts/Posts";
import Stories from "./_components/Stories/Stories";
// ==========================================================================
function Hero() {
  const now = new Date();
  const stories = [
    {
      id: crypto.randomUUID(),
      userImage: "/sample_profile.jpg",
      date: new Date(now.getTime() - 2 * 60 * 1000), // من دقيقتين
      storyMedia:
        "https://i.pinimg.com/736x/e7/8a/a8/e78aa834840ed5e57f5ac2a527e38964.jpg",
      userName: "Mohammed Khaled",
      media_type: "image",
    },
    {
      id: crypto.randomUUID(),
      storyText:
        "Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.",
      userImage: "/sample_profile.jpg",
      date: new Date(now.getTime() - 10 * 60 * 1000), // من 10 دقايق
      bg_color: "#7c3aed",
      userName: "Amr Khaled",
    },
    {
      id: crypto.randomUUID(),
      storyText: "welcome",
      date: new Date(now.getTime() - 60 * 60 * 1000), // من ساعة
      bg_color: "#7c3aed",
      userName: "Khaled Osman",
    },
    {
      id: crypto.randomUUID(),
      storyText: "working on my social platform ",
      userImage: "/sample_profile.jpg",
      date: new Date(now.getTime() - 24 * 60 * 60 * 1000), // من يوم
      bg_color: "#db2777",
      userName: "Ghada Aied",
    },
    {
      id: crypto.randomUUID(),
      date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // من 3 أيام
      storyMedia: "https://youtu.be/1n4AJdviibs",
      userName: "Yaser Mohammed",
      media_type: "video",
    },
  ];
  const posts = [
    {
      id: randomUUID(),
      title: "Hello, welcome to visit my website",
      userName: "Amr Khaled",
      userImage: "/user.jpg",
      date: new Date(now.getTime() - 2 * 60 * 1000), // من دقيقتين
    },
    {
      id: randomUUID(),
      title: "Hi",
      userName: "Amr Khaled",
      userImage:
        "https://i.pinimg.com/736x/df/87/25/df8725cae33f4ad972450bbecbfd58e3.jpg",
      media: "https://youtu.be/Kf3H2jcllug",
      date: new Date(now.getTime() - 2 * 60 * 1000), // من دقيقتين
      mediaType: "video",
    },
  ];
  return (
    <main className="flex-1 py-10 space-y-10">
      <Stories stories={stories} />
      <Posts posts={posts} />
    </main>
  );
}

export default Hero;
