import Image from "next/image";
import Link from "next/link";
// ====================================
function VerificationResult({
  imageSrc,
  resultMessage,
  statusText,
  type,
}: {
  imageSrc: "check.svg" | "uncheck.svg";
  resultMessage: string;
  statusText: string;
  type: "SUCCESS" | "FAILED";
}) {
  return (
    <div className="flex items-center flex-col sm:gap-4 gap-3">
      <Image
        src={`/${imageSrc}`}
        alt="checked"
        width={150}
        height={150}
        className="p-2 bg-white shadow rounded-full sm:size-37.5 size-30"
      />
      <h2 className="sm:text-5xl text-3xl flex items-center gap-1 flex-wrap justify-center font-extrabold text-shadow-2xs">
        Verification
        <span
          className={`${type === "SUCCESS" ? "text-indigo-500" : "text-red-500"}`}
        >
          {statusText}
        </span>
      </h2>
      <p className="text-slate-400 sm:text-xl text-shadow-2xs">{resultMessage}</p>
      <Link
        href={"/sign-in"}
        className="py-3 sm:w-50 w-40 shadow tracking-[0.4px] hover:scale-105 transition-css rounded text-center bg-linear-to-r from-purple-500 to-indigo-500 text-white font-semibold mt-4"
      >
        Sign in
      </Link>
    </div>
  );
}

export default VerificationResult;
