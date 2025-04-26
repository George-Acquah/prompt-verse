
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown";
import { Typography } from "./ui/typography";
import { cn, getDropdownStyles } from "@/lib/utils";
import { IconUser, IconSettings, IconLogout } from "./ui/icons";
import { signOutHelper } from "@/app/utils/action";
import { User } from "next-auth";
import useIsMobile from "@/lib/hooks/use-mobile-view.hook";

interface ProfileDropdownProps {
  user: User;
  className?: string;
}

export function ProfileDropdown({ user, className }: ProfileDropdownProps) {
  const isMobile = useIsMobile();
  const styles = getDropdownStyles(
    "-12rem",
    "100%",
    "-10.5rem",
    "100%",
    isMobile
  );

  return (
    <DropdownMenu
      style={styles}
      trigger={
        <div className="cursor-pointer">
          <Image
            src={user.image ?? "/assets/images/logo.svg"}
            alt="profile"
            width={40}
            height={40}
            className={cn(
              "rounded-full border-2 border-transparent",
              "hover:border-primary transition-all",
              className
            )}
          />
        </div>
      }
      className="w-64"
    >
      {(onClose) => (
        <DropdownMenuContent className="px-1">
          {/* User Info Section */}
          <DropdownMenuLabel className="px-4 py-3">
            <Typography variant="h5" className="font-medium">
              {user.name}
            </Typography>
            <Typography variant="p" className="text-xs">
              Welcome back!
            </Typography>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Menu Items */}
          <DropdownMenuItem
            // asChild
            onClick={onClose}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Link href="/profile" className="flex items-center">
              <IconUser className="h-5 w-5 mr-2" />
              <Typography variant="p">My Profile</Typography>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onClose}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Link href="/preferences" className="flex items-center">
              <IconSettings className="h-5 w-5 mr-2" />
              <Typography variant="p">Preferences</Typography>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              signOutHelper();
              onClose();
            }}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
          >
            <IconLogout className="h-5 w-5 mr-2" />
            <Typography variant="span">Sign Out</Typography>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
