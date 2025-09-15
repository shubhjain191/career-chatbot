"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LogOut, LogIn, User } from "lucide-react";

export function ProfileSettings() {
  const { data: session, status } = useSession();

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="rounded-2xl shadow-xl">
        <CardHeader className="flex items-center gap-3 pb-2">
          <User className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold">Profile Settings</span>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          {status === "authenticated" ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Logged in as:</span>
                <span className="text-blue-700">{session.user?.email || session.user?.name}</span>
              </div>
              <Button
                variant="outline"
                className="w-full flex gap-2 items-center justify-center mt-2"
                onClick={() => signOut()}
              >
                <LogOut className="w-5 h-5" /> Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-gray-600">You are not logged in.</span>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex gap-2 items-center justify-center mt-2"
                onClick={() => signIn()}
              >
                <LogIn className="w-5 h-5" /> Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
