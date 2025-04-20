import { LoginForm } from "@/components/loginForm";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
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

        <LoginForm />
      </div>

      <div className="glassmorphism mx-auto py-12 px-4 flex flex-col justify-center items-center max-w-[24rem]">
        <span className="w-full flex justify-center items-center gap-1 sm:gap-2">
          New to CraftPrompt?{" "}
          <Link href="/auth/signup" className="text-blue-600">
            Create an account.
          </Link>
        </span>
      </div>
    </section>
  );
}
