"use client";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import ButtonSignWithGoogle from "@/components/ButtonSignWithGoogle/ButtonSignWithGoogle";
import AuthDivider from "@/components/AuthDivider/AuthDivider";
import AuthFooter from "@/components/AuthFooter/AuthFooter";
import AuthFormField from "@/components/AuthFormField/AuthFormField";
import { LoginSchema } from "@/lib/Schemas/Auth/LoginSchema";
import { LoginAction } from "@/lib/Actions/Auth/Login.action";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import Blur from "@/components/Blur/Blur";
import { useRouter } from "next/navigation";
type LoginErrors = {
  email?: string;
  password?: string;
};
function FormSignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authOLoading, setAuthOLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      setServerSuccess("");
      setServerError("");
      const validation = LoginSchema.safeParse({
        email,
        password,
      });
      if (!validation.success) {
        const newError: LoginErrors = {};
        validation.error.issues.forEach((error) => {
          switch (error.path[0]) {
            case "email":
              newError.email = error.message;
              break;
            case "password":
              newError.password = error.message;
              break;
          }
        });
        setErrors(newError);
        return;
      }
      const result = await LoginAction({
        email,
        password,
      });
      if (!result.success) return setServerError(result.message);
      setServerSuccess(result.message);
      router.refresh();
    } catch (error) {
      console.log(error);
      setServerError("An error occurred while logging in. Please try again.");
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
      className="sm:w-fit w-[90%]"
    >
      <form
        onSubmit={handleSignIn}
        className="bg-white rounded-xl shadow-2xl border border-black/15 sm:w-100 w-full overflow-hidden relative"
      >
        <div className="space-y-7 lg:p-8 p-5">
          <div className="space-y-6">
            <AuthHeader
              title="Sign in to postly"
              subtitle="Welcome back! Please sign in to continue"
            />
            <ButtonSignWithGoogle
              loading={authOLoading}
              setLoading={setAuthOLoading}
            />
          </div>
          <AuthDivider />
          <div className="space-y-2">
            <AuthFormField
              id="email"
              placeholder="Enter your email address"
              label="Email address"
              type="email"
              error={errors.email}
              value={email}
              onChange={setEmail}
            />
            <AuthFormField
              id="password"
              placeholder="Enter your password"
              label="Password"
              type="password"
              error={errors.password}
              value={password}
              onChange={setPassword}
            />
            {serverSuccess && !serverError && (
              <AlertMessage type="SUCCESS" message={serverSuccess} />
            )}
            {serverError && !serverSuccess && (
              <AlertMessage type="ERROR" message={serverError} />
            )}
            <button className="w-full hover:scale-101 transition-css bg-[#7755FF] mt-5 shadow py-1.5 font-medium text-sm rounded-md text-white cursor-pointer">
              {loading ? "Signing in . . ." : "Sign in"}
            </button>
          </div>
        </div>
        <AuthFooter
          questionText="Don’t have an account?"
          linkText="Sign up"
          href="/register"
        />
        {(loading || authOLoading) && <Blur />}
      </form>
    </motion.div>
  );
}

export default FormSignIn;
