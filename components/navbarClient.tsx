"use client";

import Link from "next/link";
import Image from "next/image";
import NavbarDropdown from "./navbarDropdown";
import { User } from "next-auth";
import { signOutHelper } from "@/app/utils/action";
import useNavbarScroll from "@/lib/hooks/use-navbar-scroll";
import Search from "./search";
import useIsMobile from "@/lib/hooks/use-mobile-view.hook";
import { useState } from "react";

interface _INavbarClient {
  isCreatePromptPage: boolean;
  user?: User;
  tags?: _ITrendingTags[];
}

const NavbarClient = ({ user, isCreatePromptPage, tags }: _INavbarClient) => {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isFixed = useNavbarScroll(!isMobile || !isSheetOpen);

  return (
    <nav
      className={`px-6 flex-between w-full mb-16 pt-3 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-0 right-0 z-50 py-3 md:py-4 px-4 bg-white/70 sm:px-12 xl:px-16 2xl:px-40 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : ""
      }`}
    >
      <Link
        href="/"
        className={`${isFixed ? "hidden sm:flex" : "flex flex-center"} gap-2 `}
      >
        <Image
          src="/icon0.svg"
          alt="PrompVerse Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptVerse</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {user ? (
          <div className="flex gap-3 md:gap-5">
            {!isCreatePromptPage && (
              <Link href="/prompts/create-prompt" className="black_btn">
                Create Prompt
              </Link>
            )}
            <button
              onClick={async () => {
                await signOutHelper();
              }}
              type="button"
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={user.image ?? "/assets/images/logo.svg"}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <Link href="/auth/login" className="black_btn">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      {isFixed ? (
        isMobile && <Search entityType="QUERY" tags={tags} />
      ) : (
        <div className="sm:hidden flex relative">
          {isFixed ? (
            isMobile && <Search entityType="QUERY" tags={tags} />
          ) : (
            <div className="sm:hidden flex relative">
              {user ? (
                <NavbarDropdown
                  user={user || null}
                  onSheetStateChange={setIsSheetOpen}
                />
              ) : (
                <Link href="/auth/login" className="black_btn">
                  Sign In
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavbarClient;
