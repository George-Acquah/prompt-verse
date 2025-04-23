import { LoginForm } from "@/components/loginForm";
import Image from "next/image";
import Link from "next/link";


export default function SignUp() {
  return (
    <section className="w-full mx-auto max-w-[24rem] px-4 sm:max-w-full flext-start flex-col pb-12">
      <div className="max-w-[24rem] mx-auto py-12 flex flex-col justify-center items-center">
        <Link href="/">
          <Image
            src="/icon0.svg"
            alt="Google Proceed"
            width={40}
            height={40}
          />
        </Link>

        <LoginForm type='signup'/>
      </div>

      <div className="glassmorphism mx-auto py-12 px-4 flex flex-col justify-center items-center max-w-[24rem]">
        <span className="w-full flex justify-center items-center gap-1 sm:gap-2">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </div>
    </section>
  );
}
