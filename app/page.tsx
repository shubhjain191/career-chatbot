import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ChatInterface } from "@/frontend/components/chat/ChatInterface";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    redirect("/chat");
  } else {
    redirect("/auth/signin");
  }
}