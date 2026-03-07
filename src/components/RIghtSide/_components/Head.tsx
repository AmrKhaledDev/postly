import Image from "next/image";
// ============================================================
function Head() {
  return (
    <div className="bg-white p-3 rounded-md w-full space-y-2 ring ring-gray-200">
      <h2>Sponsored</h2>
      <Image
        src={"/sponsored_img.png"}
        alt="sponsored_img"
        width={200}
        height={200}
        className="w-full object-cover rounded-lg"
      />
      <div className="space-y-1">
        <h3 className="font-semibold">Email marketing</h3>
        <p className="text-sm text-gray-500">
          upercharge your marketing witha a powerful, easy-to-use platform built
          for results.
        </p>
      </div>
    </div>
  );
}

export default Head;
