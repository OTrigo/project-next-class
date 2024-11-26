import EditUserForm from "@/app/components/client/EditUserForm";
import { PrismaClient } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
  const param = await params;

  const prisma = new PrismaClient();
  const tags = await prisma.tag.findMany();
  const user = await prisma.user.findUnique({
    where: {
      id: param.id,
    },
  });

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <EditUserForm user={user} tags={tags} />
    </div>
  );
}
