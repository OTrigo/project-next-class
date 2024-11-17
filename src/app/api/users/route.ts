import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { User } from "@/app/types";

export async function GET() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return NextResponse.json({
    message: users,
  });
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as User;
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        document: data.document,
      },
    });
    return NextResponse.json({ message: user });
  } catch (error) {
    return NextResponse.json({
      message: "Não foi possível criar o usuário!",
      prismaError: error,
    });
  }
}
