import { headers } from "next/headers";

export const getServerPathname = async () => {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  return pathname || "/";
}