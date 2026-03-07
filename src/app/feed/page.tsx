import Feeds from "@/components/Feeds/Feeds";
import RightSide from "@/components/RIghtSide/RightSide";
// ======================================================================
function Feed() {
  return (
    <main className="flex-1 flex gap-7">
      <Feeds />
      <RightSide />
    </main>
  );
}

export default Feed;
