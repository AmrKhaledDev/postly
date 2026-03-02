"use client";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import ButtonSignWithGoogle from "@/components/ButtonSignWithGoogle/ButtonSignWithGoogle";
import AuthDivider from "@/components/AuthDivider/AuthDivider";
import AuthFooter from "@/components/AuthFooter/AuthFooter";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { RegisterSchema } from "@/lib/Schemas/Auth/Register.schema";
import { RegisterAction } from "@/lib/Actions/Auth/Register.action";
import AuthFormField from "@/components/AuthFormField/AuthFormField";
import Blur from "@/components/Blur/Blur";
// ==============================================================================
type Errors = {
  name?: string;
  email?: string;
  password?: string;
};
function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [authOLoading, setAuthOLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setServerError("");
      setErrors({});
      setServerSuccess("");
      const validation = RegisterSchema.safeParse({
        name,
        email,
        password,
      });
      if (!validation.success) {
        const newError: Errors = {};
        validation.error.issues.forEach((error) => {
          switch (error.path[0]) {
            case "name":
              newError.name = error.message;
              break;
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
      const result = await RegisterAction({
        name,
        email,
        password,
      });
      if (!result.success) return setServerError(result.message);
      setName("");
      setEmail("");
      setPassword("");
      setServerError("");
      setErrors({});
      setServerSuccess(result.message);
    } catch (error) {
      console.log(error);
      setServerError("Account creation failed. Please try again later");
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
      className="sm:w-fit w-[90%] "
    >
      <form onSubmit={handleSignUp} className="bg-white rounded-xl shadow-2xl border border-black/15 sm:w-100 w-full overflow-hidden relative">
        <div className="space-y-7 lg:p-8 p-5">
          <div className="space-y-6">
            <AuthHeader
              title="Create your account"
              subtitle="Welcome! Please fill in the details to get started"
            />
            <ButtonSignWithGoogle
              loading={authOLoading}
              setLoading={setAuthOLoading}
            />
          </div>
          <AuthDivider />
          <div className="space-y-2">
            <AuthFormField
              value={name}
              onChange={setName}
              id="name"
              placeholder="Enter your name"
              label="Name"
              type="text"
              error={errors.name}
            />
            <AuthFormField
              value={email}
              onChange={setEmail}
              id="email"
              placeholder="Enter your email address"
              label="Email address"
              type="email"
              error={errors.email}
            />
            <AuthFormField
              value={password}
              onChange={setPassword}
              id="password"
              placeholder="Enter your password"
              label="Password"
              type="password"
              error={errors.password}
            />
            {serverSuccess && !serverError && (
              <AlertMessage type="SUCCESS" message={serverSuccess} />
            )}
            {serverError && !serverSuccess && (
              <AlertMessage type="ERROR" message={serverError} />
            )}
            <button
              disabled={loading || authOLoading}
              className="w-full hover:scale-101 disabled:bg-[#9f89f8] transition-css bg-[#7755FF] mt-5 shadow py-1.5 font-medium text-sm rounded-md text-white cursor-pointer"
            >
              {loading ? "Signing up . . ." : "Sign up"}
            </button>
          </div>
        </div>
        <AuthFooter
          questionText="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
        {(loading || authOLoading) && (
        <Blur/>
        )}
      </form>
    </motion.div>
  );
}

export default RegisterForm;
