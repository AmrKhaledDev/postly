"use client";
import LoginFormField from "@/components/AuthFormField/AuthFormField";
import Link from "next/link";
import ButtonSignWithGoogle from "../ButtonSignWithGoogle/ButtonSignWithGoogle";
import AuthHeader from "../AuthHeader/AuthHeader";
import AuthDivider from "../AuthDivider/AuthDivider";
import AuthFooter from "../AuthFooter/AuthFooter";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { LoginSchema } from "@/lib/Schemas/Auth/LoginSchema";
import { LoginAction } from "@/lib/Actions/Auth/Login.action";
import { useRouter } from "next/navigation";
import AlertMessage from "../AlertMessage/AlertMessage";
import Blur from "../Blur/Blur";
// ==============================================================================
type LoginErrors = {
  email?: string;
  password?: string;
};
function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [authOLoading, setAuthOLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [erros, setErrors] = useState<LoginErrors>({});
  const handleSignin = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setServerError("");
      setServerSuccess("");
      setErrors({});
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
      router.refresh()
    } catch (error) {
      console.log(error);
      setServerError("An error occurred while logging in. Please try again");
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
      className="sm:w-fit w-full"
    >
      <form
        onSubmit={handleSignin}
        className="bg-white rounded-xl shadow-2xl border border-black/15 lg:w-110 md:w-100 sm:w-130 w-full overflow-hidden relative"
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
            <LoginFormField
              id="email"
              placeholder="Enter your email address"
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              error={erros.email}
            />
            <div className="space-y-0.5">
              <LoginFormField
                id="password"
                placeholder="Enter your password"
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                error={erros.password}
              />
              <Link
                href={"/"}
                className="text-[13px] font-medium text-slate-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {serverSuccess && !serverError && (
              <AlertMessage type="SUCCESS" message={serverSuccess} />
            )}
            {serverError && !serverSuccess && (
              <AlertMessage type="ERROR" message={serverError} />
            )}
            <button className="w-full hover:scale-101 transition-css border border-black bg-linear-to-t from-[#33343B] to-[#3E3F46] mt-5 shadow py-1.5 font-medium text-sm rounded-md text-white cursor-pointer">
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

export default LoginForm;
