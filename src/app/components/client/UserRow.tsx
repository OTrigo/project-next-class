"use client";

import { Tag, User } from "@prisma/client";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { deleteUser } from "../server/actions/userActions";

const AllUsers = ({ user, tags }: { user: User; tags: Tag[] }) => {
  const tag = tags.find((tag: Tag) => tag.id === user.tagId)?.name;

  const handleDeleteUser = async () => {
    await deleteUser({ id: user?.id });
    window.location.reload();
  };

  return (
    <>
      <li className="inline-flex gap-4 py-1 px-2">
        <Link href={`/users/update/${user.id}`}>
          <code className="flex flex-col bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 font-semibold rounded-sm w-full">
            <span className="flex justify-between">
              <p className="inline-flex">{user.name}</p>
            </span>
          </code>
        </Link>
        <p className="inline-flex rounded-md px-2 bg-white/10">{tag}</p>
        <button onClick={handleDeleteUser}>
          <MdDelete />
        </button>
      </li>
    </>
  );
};
export default AllUsers;
