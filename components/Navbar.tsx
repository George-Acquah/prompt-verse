import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerPathname } from "@/app/utils/server-utils";
import NavbarDropdown from "./navbarDropdown";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
  const pathname = await getServerPathname();
  const session = await auth();
  const isCreatePromptPage = pathname === "/prompts/create-prompt";

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="PrompVerse Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptVerse</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {!isCreatePromptPage && (
              <Link href="/prompts/create-prompt" className="black_btn">
                Create Prompt
              </Link>
            )}
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="outline_btn"
            >
              <button type="submit">Sign Out</button>
            </form>
            <Link href="/profile">
              <Image
                src={session?.user.image ?? "/assets/images/logo.svg"}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
            {/* { providers && Object.values(providers).map( provider => (
          <button 
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'>
              Sign In
          </button>
        ))} */}
          </div>
        ) : (
          <Link href="/auth/login" className="black_btn">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <NavbarDropdown userImage={session?.user.image || null} />
        ) : (
          <Link href="/auth/login" className="black_btn">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;