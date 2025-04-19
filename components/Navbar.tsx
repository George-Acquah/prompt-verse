import React from "react";
import { getServerPathname } from "@/app/utils/server-utils";
import { auth} from "@/auth";
import NavbarClient from "./navbarClient";
import { getTrendingTags } from "@/app/utils/action";

const Navbar = async () => {
  const pathname = await getServerPathname();
  const session = await auth();
  const { data: tags } = await getTrendingTags();
  const isCreatePromptPage = pathname === "/prompts/create-prompt";

  return (
    <NavbarClient isCreatePromptPage={isCreatePromptPage} user={session?.user} tags={ tags} />
  );
};

export default Navbar;