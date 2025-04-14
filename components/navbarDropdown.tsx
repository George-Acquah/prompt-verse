"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOutHelper } from "@/app/utils/action";

interface NavbarDropdownProps {
  userImage: string | null;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ userImage }) => {
  const [toggleDropDown, setToggleDropDown] = useState(false);

  return (
    <div className="flex">
      <Image
        src={userImage ?? "/assets/images/logo.svg"}
        alt="profile"
        width={37}
        height={37}
        className="rounded-full cursor-pointer"
        onClick={() => setToggleDropDown((prev) => !prev)}
      />
      {toggleDropDown && (
        <div className="dropdown">
          <Link
            href="/profile"
            className="dropdown_link"
            onClick={() => setToggleDropDown(false)}
          >
            My Profile
          </Link>
          <Link
            href="/create-prompt"
            className="dropdown_link"
            onClick={() => setToggleDropDown(false)}
          >
            Create Prompt
          </Link>
          <button
            type="button"
            onClick={async () => {
              setToggleDropDown(false);
              await signOutHelper();
            }}
            className="black_btn mt-5 w-full"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
