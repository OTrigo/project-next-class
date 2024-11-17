"use client"

import { User } from "@/app/types"
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa";

export default function Page({ params }: { params: Promise<{ id: string }> }) {

  const router = useRouter()

  const [dataUser, setDataUser] = useState<User>({} as User)

  const { id } = use(params)

  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "GET",
      })

      const returnedUser: User = await response.json()

      if (!returnedUser) return

      const { name, email, document, password } = returnedUser

      setDataUser(
        {
          name,
          email,
          document,
          password
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <span className="text-sm inline-flex gap-2 justify-center items-center cursor-pointer" onClick={() => router.push('/users')}><FaArrowLeft />Return</span>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">

            All info of <code className="dark:bg-white/[.06]">{dataUser?.name}</code>
            <code className="flex flex-col gap-4 bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 font-semibold rounded-sm">
              <ul>
                <ul className="w-full">
                  <li>
                    <code className="flex flex-col gap-4 bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 font-semibold rounded-sm">
                      <p>Name:{dataUser?.name}</p>
                      <p>Email:{dataUser?.email}</p>
                      <p>Document{dataUser?.document}</p>
                    </code>
                  </li>
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
