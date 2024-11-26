import CreateUserForm from "@/app/components/client/CreateUserForm";
import { PrismaClient } from "@prisma/client";

export default async function Page() {
  const prisma = new PrismaClient();
  const tags = await prisma.tag.findMany();

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <CreateUserForm tags={tags} />
    </div>
  );
}
