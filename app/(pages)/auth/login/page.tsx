import { LoginForm } from "@/components/loginForm";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <section className="w-full max-w-full flext-start flex-col ">
      <div className=" mx-auto px-8 py-12 h-full flex flex-col justify-center items-center ">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="Google Proceed"
            width={40}
            height={40}
          />
        </Link>

        <LoginForm />
      </div>

      <div className="glassmorphism mx-auto py-12 px-8 flex flex-col justify-center items-center max-w-[24rem] -my-6">
        <span className="w-full flex justify-center items-center gap-2">
          New to PromptVerse?{" "}
          <Link href="/signup" className="text-blue-600">
            Create an account.
          </Link>
        </span>
      </div>
    </section>
  );
}
