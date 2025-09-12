import {PrismaClient} from "@prisma/client";

let prisma: PrismaClient;

function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

export type Context = {
  prisma: PrismaClient;
};

export async function createContext(): Promise<Context> {
    return {
        prisma: getPrismaClient(),
    };
}