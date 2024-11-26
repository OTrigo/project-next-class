"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateUserInput {
  name: string;
  email: string;
  document: string;
  password: string;
  tagId: string;
}

export async function createUser(data: CreateUserInput) {
  try {
    const user = await prisma.user.create({
      data,
    });

    console.log("User created:", user);

    return { success: true, user };
  } catch (error) {
    console.error({ error });
  }
}

export async function changeUser({
  id,
  data,
}: {
  id: string;
  data: CreateUserInput;
}) {
  try {
    const oldUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name ?? oldUser?.name,
        email: data.email ?? oldUser?.email,
        document: data.document ?? oldUser?.document,
        password: data.password ?? oldUser?.password,
        tagId: data.tagId ?? oldUser?.tagId,
      },
    });

    console.log("User Updated:", user);

    return { success: true, user };
  } catch (error) {
    console.error({ error });
  }
}

export async function deleteUser({ id }: { id: string }) {
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error({ error });
  }
}
