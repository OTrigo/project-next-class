"use client";
import { Tag } from "@prisma/client";
import Link from "next/link";
import { createUser } from "../server/actions/userActions";
import { z } from "zod";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const CreateUserForm = ({ tags }: { tags: Tag[] }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const handleCreateNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const UserSchema = z.object({
      name: z.string().nonempty("Name is required."),
      email: z.string().email("Invalid email address."),
      document: z
        .string()
        .min(11, "Document must be at least 11 characters.")
        .max(14, "Document must be at most 14 characters."),
      password: z.string().nonempty("Password is required."),
      tagId: z.string().nonempty("Tag is required."),
    });

    const formData = new FormData(e.currentTarget);
    const validatingData = UserSchema.safeParse(Object.fromEntries(formData));

    if (!validatingData.success) {
      const errorMessages = validatingData.error.errors.reduce(
        (accumulatedErrors, currentError) => {
          const fieldName = currentError.path[0];
          const errorMessage = currentError.message;

          accumulatedErrors[fieldName] = errorMessage;
          return accumulatedErrors;
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

    const response = await createUser(data);

    if (response?.success) {
      router.replace("/users");
    }

    return response;
  };

  return (
    <div className="space-y-6">
      <Card className="min-w-[500px]">
        <CardHeader>
          <div className="flex items-center">
            <Link
              className="inline-flex items-center text-sm hover:text-primary"
              href="../"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return
            </Link>
          </div>
          <CardTitle>Create New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateNewUser} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" />
                {errors.name && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.name}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
                {errors.email && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="document">Document</Label>
                <Input id="document" name="document" />
                {errors.document && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.document}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" />
                {errors.password && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagId">Tag</Label>
                <Select name="tagId">
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
                Create User
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUserForm;
