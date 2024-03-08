import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";
import { prisma } from "../prisma";

container.register<PrismaClient>("PrismaClient", {
  useValue: prisma,
});
