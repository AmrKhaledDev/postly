import { VerificationAction } from "@/lib/Actions/Auth/VerificationEmail.action";
import Image from "next/image";
import Link from "next/link";
import VerificationResult from "./_components/VerificationResult";
// =======================================================================================
async function Verify({
  params,
}: {
  params: Promise<{ verificationToken: string }>;
}) {
  const { verificationToken } = await params;
  const result = await VerificationAction(verificationToken);
  return (
    <main>
      <div className="container-css min-h-screen flex items-center justify-center">
        {result.success ? (
          <VerificationResult
            statusText="Succeeded"
            imageSrc="check.svg"
            resultMessage={result.message}
            type="SUCCESS"
          />
        ) : (
          <VerificationResult
            statusText="Failed"
            imageSrc="uncheck.svg"
            resultMessage={result.message}
            type="FAILED"
          />
        )}
      </div>
    </main>
  );
}

export default Verify;
