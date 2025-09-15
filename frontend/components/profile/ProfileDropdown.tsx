"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function ProfileDropdown() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 focus:outline-none">
          <Avatar className="w-9 h-9 shadow">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
              <User className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium text-gray-700">
            {user?.name || user?.email || "Profile"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuItem asChild>
          <Link href="/profile">Account Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()} className="text-red-600 flex gap-2 items-center">
          <LogOut className="w-4 h-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
