import Head from "./_components/Head";
import RecentMessages from "./_components/RecentMessages";
// ======================================================================
function RightSide() {
  return (
    <div className="w-75 py-10 pr-3 space-y-3">
      <Head />
      <RecentMessages />
    </div>
  );
}

export default RightSide;
