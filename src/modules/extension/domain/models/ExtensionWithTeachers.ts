import { Extension } from "@prisma/client";

export type ExtensionWithTeachers = Extension & {
  teachers: { teacherId: number }[];
};
