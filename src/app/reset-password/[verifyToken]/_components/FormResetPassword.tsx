"use client";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import AuthFooter from "@/components/AuthFooter/AuthFooter";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import AuthFormField from "@/components/AuthFormField/AuthFormField";
import Blur from "@/components/Blur/Blur";
import { ResetPasswordSchema } from "@/lib/Schemas/Auth/ResetPasswordSchema";
import { ResetPasswordAction } from "@/lib/Actions/Auth/ResetPassword.action";
// ================================================================
type Errors = {
  newPassword?: string;
  confirmPassword?: string;
};
function FormResetPassword({ verifyToken }: { verifyToken: string }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setServerError("");
      setErrors({});
      setServerSuccess("");
      setLoading(true);
      const validation = ResetPasswordSchema.safeParse({
        newPassword,
        confirmPassword,
      });
      if (!validation.success) {
        const newError: Errors = {};
        validation.error.issues.forEach((error) => {
          switch (error.path[0]) {
            case "newPassword":
              newError.newPassword = error.message;
              break;
            case "confirmPassword":
              newError.confirmPassword = error.message;
          }
        });
        setErrors(newError);
        return;
      }
      const result = await ResetPasswordAction(
        verifyToken,
        newPassword,
        confirmPassword,
      );
      if (!result.success) return setServerError(result.message);
      setServerSuccess(result.message);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setServerError("Password cannot be changed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full flex items-center justify-center"
    >
      <form
        onSubmit={handleResetPassword}
        className="bg-white rounded-xl shadow-2xl border border-black/15 sm:w-100 w-[95%] overflow-hidden relative"
      >
        <div className="space-y-7 sm:p-8 p-4">
          <AuthHeader
            title="Reset Password"
            subtitle="Your new password must be strong to protect your account from hacking."
          />
          <div className="space-y-2">
            <AuthFormField
              value={newPassword}
              onChange={setNewPassword}
              id="new-password"
              placeholder="Enter your new password"
              label="New Password"
              type="password"
              error={errors.newPassword}
            />
            <AuthFormField
              value={confirmPassword}
              onChange={setConfirmPassword}
              id="confirm-password"
              placeholder="Enter your confirm password"
              label="Confirm Password"
              type="password"
              error={errors.confirmPassword}
            />
            {serverError && !serverSuccess && (
              <AlertMessage type="ERROR" message={serverError} />
            )}
            {serverSuccess && !serverError && (
              <AlertMessage type="SUCCESS" message={serverSuccess} />
            )}

            <button
              disabled={loading}
              className="w-full hover:scale-101 disabled:bg-[#9f89f8] transition-css bg-[#7755FF] mt-5 shadow py-1.5 font-medium text-sm rounded-md text-white cursor-pointer"
            >
              {loading ? "Reseting . . ." : " Reset"}
            </button>
          </div>
        </div>
        <AuthFooter
          questionText="Undo password change?"
          linkText="Sign in"
          href="/"
        />
        {loading && <Blur />}
      </form>
    </motion.div>
  );
}

export default FormResetPassword;
