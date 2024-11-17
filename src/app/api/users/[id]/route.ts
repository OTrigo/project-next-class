import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

import { User } from "@/app/types";

export async function GET(
  req: NextApiRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({
      message: "Não foi possível buscar o usuário!",
      prismaError: error,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Raw params:", params);
    const id = params?.id;
    console.log("ID to delete:", id);

    const prisma = new PrismaClient();

    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });

      return NextResponse.json(
        {
          message: "User deleted successfully",
          user: deletedUser,
        },
        { status: 200 }
      );
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error("Delete operation failed:", error);
    return NextResponse.json(
      {
        message: "Failed to delete user",
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as User;

    const prisma = new PrismaClient();

    const userOldInfo = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    });

    const user = await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        name: body.name ?? userOldInfo?.name,
        email: body.email ?? userOldInfo?.email,
        password: body.password ?? userOldInfo?.password,
        document: body.document ?? userOldInfo?.document,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({
      message: "Não foi possível buscar o usuário!",
      prismaError: error,
    });
  }
}
