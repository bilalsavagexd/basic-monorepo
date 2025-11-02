import { PrismaClient, type User } from "./generated/prisma/client.js";

export const prismaClient = new PrismaClient();
export type { User };