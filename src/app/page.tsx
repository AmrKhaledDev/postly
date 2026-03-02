import LandingHero from "@/components/LandingHero/LandingHero";
import LoginForm from "@/components/LoginForm/LoginForm";
import Image from "next/image";
// =======================================================================
export default function Home() {
  return (
    <main className="min-h-screen md:py-7 sm:py-5 py-3 px-3">
      <Image src={"/login-bg.png"} className="-z-1" alt="login bg" fill />
      <div className="container-css flex flex-col md:gap-10 gap-15">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={220}
          height={220}
          className="lg:w-55 md:w-50 sm:w-40 w-35 lg:h-12 md:h-11 sm:h-9 h-8"
        />
        <div className="flex items-center md:flex-row flex-col justify-between md:gap-5 gap-15">
          <LandingHero />
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
