"use client";

import React, { useState } from "react";
import { Tag, User } from "@prisma/client";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { changeUser } from "../server/actions/userActions";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EditUserForm = ({ user, tags }: { user: User | null; tags: Tag[] }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const UserSchema = z.object({
      name: z.string().min(1),
      email: z.string().email("Invalid email address."),
      document: z
        .string()
        .min(11, "Document must be at least 11 characters.")
        .max(14, "Document must be at most 14 characters."),
      password: z.string().min(1),
      tagId: z.string().min(1),
    });

    const validatingData = UserSchema.safeParse(Object.fromEntries(formData));

    if (!validatingData.success) {
      const errorMessages = validatingData.error.errors.reduce(
        (acc, currentError) => {
          const fieldName = currentError.path[0];
          const errorMessage = currentError.message;
          acc[fieldName] = errorMessage;
          return acc;
        },
        {} as Record<string, string>
      );
      setErrors(errorMessages);
      return;
    }

    setErrors({});

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      document: formData.get("document") as string,
      password: formData.get("password") as string,
      tagId: formData.get("tagId") as string,
    };

    if (!data) {
      console.log("No data");
      return;
    }

    const response = await changeUser({ data, id: user?.id as string });
    if (response?.success) {
      router.replace("/users");
    }
    console.log("Response:", response);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center">
        <Link
          className="inline-flex items-center text-sm hover:text-primary"
          href="../"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return
        </Link>
      </div>

      <Card className="min-w-[500px]">
        <CardHeader>
          <CardTitle>Edit User: {user?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEditUser} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={user?.name} />
                {errors.name && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.name}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                />
                {errors.email && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="document">Document</Label>
                <Input
                  id="document"
                  name="document"
                  defaultValue={user?.document}
                />
                {errors.document && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.document}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue={user?.password}
                />
                {errors.password && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagId">Tag</Label>
                <Select name="tagId" defaultValue={user?.tagId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags?.map((tag) => (
                      <SelectItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tagId && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.tagId}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <CardFooter className="px-0">
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUserForm;
