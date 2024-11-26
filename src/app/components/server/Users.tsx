import { PrismaClient, User } from "@prisma/client";
import UserRow from "../client/UserRow";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function Users() {
  const prisma = new PrismaClient();
  const dataUser: User[] = await prisma.user.findMany();

  const tags = await prisma.tag.findMany();

  return (
    <Card className="w-full max-w-4xl mx-auto h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Users</CardTitle>
        <Link href="users/create/">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create one
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-fit w-full rounded-md border">
          <div className="p-4">
            {dataUser?.map((user, index) => (
              <div key={index} className="py-2">
                <UserRow tags={tags} user={user} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
