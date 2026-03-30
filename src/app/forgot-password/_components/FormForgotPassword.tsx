"use client";
import AuthFormField from "@/components/AuthFormField/AuthFormField";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import Blur from "@/components/Blur/Blur";
import { FormEvent, useState } from "react";
import { ForgotPasswordAction } from "@/lib/Actions/Auth/ForgotPassword.action";
// =======================================================================
function FormForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setServerSuccess("");
    if (!email.trim()) return setError("The email address must not be empty");
    setLoading(true);
    const result = await ForgotPasswordAction(email);
    setLoading(false);
    if (!result.success) return setError(result.message);
    setServerSuccess(result.message);
    setEmail("");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex items-center justify-center"
    >
      <form
        onSubmit={handle}
        className="bg-white relative rounded-xl shadow-2xl border border-black/15 sm:w-100 w-[95%]  overflow-hidden "
      >
        <Link
          href={"/"}
          className="text-gray-300 text-xl text-shadow-2xs hover:text-black transition-css m-3 block w-fit"
        >
          <FaLongArrowAltLeft />
        </Link>
        <div className="sm:p-8 p-5">
          <AuthHeader
            title="Forgot Password"
            subtitle="Enter your email address to receive a password reset link."
          />
          <div className="mt-13 space-y-1">
            <AuthFormField
              id="email"
              placeholder="Enter your email address"
              label="Email"
              type="email"
              error={error}
              value={email}
              onChange={setEmail}
            />
            {serverSuccess && !error && (
              <AlertMessage type="SUCCESS" message={serverSuccess} />
            )}
            <button
              disabled={loading}
              className="w-full hover:scale-101 transition-css bg-[#7755FF] mt-5 shadow py-2 font-medium  rounded-md text-white cursor-pointer"
            >
              {loading ? "Sending . . ." : "Send Link"}
            </button>
          </div>
        </div>
        {loading && <Blur />}
      </form>
    </motion.div>
  );
}

export default FormForgotPassword;
