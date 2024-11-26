"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTag(id: string) {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id,
      },
    });
    return tag?.name;
  } catch (error) {
    console.error(error);
  }
}
