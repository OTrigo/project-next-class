"use client"

import { User } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {

  const router = useRouter()

  const [dataUser, setDataUser] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllUsers = async () => {
    try {
      const response = await fetch('/api/users/')

      const returnedUser = await response.json()

      setDataUser(returnedUser.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id?: string) => {
    try {
      if (!id) return
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      })

      const returnedUser = await response.json()

      console.log(returnedUser)

      if (!returnedUser) console.log("Não foi possível deletar o usuário!")

      getAllUsers()
      return
    } catch (err) {
      console.log(err)
      return
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getAllUsers()
    setIsLoading(false)
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            List all users - <button className="bg-white/[.05]" onClick={() => router.push("/users/create")}>Create new user</button>
            <code className="flex flex-col gap-4 bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 font-semibold rounded-sm">
              <ul>
                <ul className="flex w-full flex-col justify-center">
                  {dataUser.length > 0 ? (<>
                    {dataUser?.map((user, index) => (
                      <div key={index} className="flex">
                        <li className="inline-flex gap-4">
                          <Link href={`/users/${user.id}`}>
                            <code className="flex flex-col bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 font-semibold rounded-sm">
                              <p className="inline-flex">{user.name}
                              </p>
                            </code>
                          </Link>
                          <span className="inline-flex gap-1 h-full justify-center items-center">
                            <Link href={`/users/update/${user.id}`}>
                              <FaEdit />
                            </Link>
                            <button onClick={() => { handleDelete(user.id) }}>
                              <MdDelete />
                            </button>
                          </span>
                        </li>
                      </div>
                    ))}</>) : (<>
                      <div className="flex">
                        <li className="inline-flex gap-4">
                          <code className="flex flex-col bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 font-semibold rounded-sm">
                            <p className="inline-flex">{isLoading ? "Loading..." : "Doesn't have a user"}
                            </p>
                          </code>
                          <span className="inline-flex gap-1 h-full justify-center items-center">
                            <FaEdit />
                          </span>
                        </li>
                      </div>
                    </>)}

                </ul>
              </ul>
            </code>
          </li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>

      </footer>
    </div>
  );
}
