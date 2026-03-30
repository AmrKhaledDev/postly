import { Metadata } from "next";
import FormResetPassword from "./_components/FormResetPassword";
// ===============================================================
export const metadata: Metadata = {
  title: "Postly | Reset Password",
  description: "ChaChange your password if you forget it.",
};
async function ResetPassword({
  params,
}: {
  params: Promise<{ verifyToken: string }>;
}) {
  const { verifyToken } = await params;
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="container-css">
        <FormResetPassword verifyToken={verifyToken} />
      </div>
    </main>
  );
}

export default ResetPassword;
