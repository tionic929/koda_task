import { PrismaClient } from "@prisma/client";
import { PrismaNodeSQLite } from "prisma-adapter-node-sqlite";

const dbPath = process.env.DATABASE_URL || "file:./dev.db";
const adapter = new PrismaNodeSQLite({ url: dbPath });

export const prisma = new PrismaClient({ adapter });
