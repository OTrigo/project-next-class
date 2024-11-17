"use client"

import { User } from "@/app/types"
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";

export default function Page({ params }: { params: Promise<{ id: string }> }) {

  const [dataUser, setDataUser] = useState<User>({} as User)
  const nameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const documentInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  const router = useRouter()

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

  const editUser = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: nameInput.current?.value ?? dataUser.name,
          email: emailInput.current?.value ?? dataUser.email,
          document: documentInput.current?.value ?? dataUser.document,
          password: passwordInput.current?.value ?? dataUser.password
        })
      })

      const returnedUser: User = await response.json()

      console.log("tá no put:", returnedUser)

      if (!returnedUser) return

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
                  <li className="relative">
                    <code className="flex flex-col gap-4 bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 font-semibold rounded-sm">
                      <span>Name: <input type="text" ref={nameInput} className="bg-transparent" defaultValue={dataUser.name} /></span>
                      <span>Email: <input type="text" ref={emailInput} className="bg-transparent" defaultValue={dataUser.email} /></span>
                      <span>Document: <input type="text" ref={documentInput} className="bg-transparent" defaultValue={dataUser.document} /></span>
                    </code>
                    <button className="flex absolute right-0" onClick={() => editUser()}><MdArrowRightAlt size={24} /></button>
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
