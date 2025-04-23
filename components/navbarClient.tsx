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
      className={`px-2 sm:px-6 flex-between w-full mb-8 sm:mb-16 pt-3 transition-all duration-300 ${
        isFixed
          ? "fixed top-0 left-0 right-0 z-50 py-3 md:py-4 px-4 bg-white/70 sm:px-12 xl:px-16 2xl:px-40 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : ""
      }`}
    >
      <Link
        href="/"
        className={`${isFixed ? "hidden sm:flex" : "flex flex-center"} gap-2`}
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
      <div className="sm:flex hidden items-center gap-4">
        {!isCreatePromptPage && user && (
          <Link
            href="/prompts/create-prompt"
            className="px-8 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Create Prompt
          </Link>
        )}

        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                Explore
              </Link>
              <Link
                href="/prompts/saved"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                Saved
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                Profile
              </Link>
            </div>

            {/* User Profile with Dropdown */}
            <div className="relative group">
              <Image
                src={user.image ?? "/assets/images/logo.svg"}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all"
              />

              {/* Desktop Dropdown */}
              <div className="absolute right-0 mt-[2px] w-56 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block z-50">
                <div className="py-2 px-4">
                  <div className=" py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      Welcome back!
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    className="block py-2 text-sm px-4 text-gray-700 rounded-sm hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/preferences"
                    className="block rounded-sm px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Preferences
                  </Link>
                  <button
                    onClick={signOutHelper}
                    className="w-full text-left rounded-sm px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/explore"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
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
