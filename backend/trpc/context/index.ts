import {PrismaClient} from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

let prisma: PrismaClient;

function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

export type Context = {
  prisma: PrismaClient;
  session: Awaited<ReturnType<typeof getServerSession>>;
  userId: string | null;
};

export async function createContext(): Promise<Context> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
    return {
        prisma: getPrismaClient(),
        session,
        userId,
    };
}