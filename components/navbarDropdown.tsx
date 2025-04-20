"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOutHelper } from "@/app/utils/action";
import { useOutsideClick } from "@/lib/hooks/use-outside-click.hook";
import { IconClose } from "./ui/icons";
import { User } from "next-auth";
import { useTheme } from "next-themes";
import { themes } from "@/lib/data";

interface NavbarDropdownProps {
  user: User | null;
  onSheetStateChange?: (isOpen: boolean) => void;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({
  user,
  onSheetStateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setTheme, theme } = useTheme();
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const [recentActivities] = useState([
    { id: 1, text: 'You created "AI Art Prompts"' },
    { id: 2, text: 'Liked "Creative Writing Tips"' },
    { id: 3, text: 'Shared "Productivity Hacks"' },
  ]);

  useEffect(() => {
    if (onSheetStateChange) {
      onSheetStateChange(isOpen && isAnimating);
    }
  }, [isOpen, isAnimating, onSheetStateChange]);

  const toggleSheet = () => {
    if (isOpen) {
      closeSheet();
    } else {
      setIsOpen(true);
      setIsAnimating(true);
    }
  };

  const closeSheet = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  useOutsideClick(sheetRef, closeSheet);

  const handleLinkClick = () => {
    closeSheet();
  };

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="relative" ref={sheetRef}>
      <Image
        src={user?.image ?? "/assets/images/logo.svg"}
        alt="profile"
        width={37}
        height={37}
        className="rounded-full cursor-pointer profile-image"
        onClick={toggleSheet}
      />

      {/* Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeSheet}
        />
      )}

      {/* Sheet */}
      {isOpen && (
        <div
          className={`fixed top-0 right-0 h-screen w-[85%] max-w-md bg-white dark:bg-gray-900 z-50 user-sheet transition-transform duration-300 ease-in-out overflow-auto ${
            isAnimating ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Menu
              </h2>
              <button
                onClick={closeSheet}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <IconClose className="h-5 w-5 text-gray-700 dark:text-gray-300 cursor-pointer" />
              </button>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="relative">
                <Image
                  src={user?.image ?? "/icon0.svg"}
                  alt="profile"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"></span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {user?.name || "User name"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome back!
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              <Link
                href="/prompts/create-prompt"
                onClick={handleLinkClick}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              >
                <svg
                  className="h-6 w-6 mb-1 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="text-sm text-center text-gray-700 dark:text-gray-300">
                  New Prompt
                </span>
              </Link>
              <Link
                href="/collections"
                onClick={handleLinkClick}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              >
                <svg
                  className="h-6 w-6 mb-1 text-purple-500 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span className="text-sm text-center text-gray-700 dark:text-gray-300">
                  Collections
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 mb-6">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span>Explore Prompts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/prompts/saved"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    <span>Saved Prompts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preferences"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Preferences</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Recent Activity Section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Recent Activity
              </h3>
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="text-sm p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded transition-colors cursor-pointer text-gray-700 dark:text-gray-300"
                    onClick={handleLinkClick}
                  >
                    {activity.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Selector with Icons */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Theme
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((thm) => (
                  <button
                    key={thm.name}
                    onClick={() => handleThemeChange(thm.name)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                      theme === thm.name
                        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        theme === thm.name
                          ? "bg-blue-200 dark:bg-blue-800/70"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {thm.icon}
                    </div>
                    <span className="mt-1 text-sm capitalize">{thm.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800/50">
              <button
                type="button"
                onClick={async () => {
                  closeSheet();
                  await signOutHelper();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
