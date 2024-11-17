"use client"

import { User } from "@/app/types";
import { useRef } from "react";
import Link from "next/link";

export default function Page() {

  const nameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const documentInput = useRef<HTMLInputElement>(null)

  const createUser = async (data: User) => {
    try {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      const returnedUser = await response.json()

      return returnedUser
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreate = async () => {
    if (!nameInput.current && !emailInput.current && !passwordInput.current && !documentInput.current) {
      return
    }
    const data = {
      name: nameInput.current?.value ?? "",
      email: emailInput.current?.value ?? "",
      password: passwordInput.current?.value ?? "",
      document: documentInput.current?.value ?? ""
    }
    console.log(data)

    await createUser(data)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <Link href={"./users/"}><span>Return</span></Link>
          <li className="mb-2">
            Create Users -
            <code className="flex flex-col gap-4 bg-black/[.05] dark:bg-white/[.06] px-2 py-2 font-semibold rounded-sm text-black">
              <input ref={nameInput} type="text" placeholder="name" className="p-1"></input>
              <input ref={emailInput} type="email" placeholder="email" className="p-1"></input>
              <input ref={passwordInput} type="password" placeholder="password" className="p-1"></input>
              <input ref={documentInput} type="password" placeholder="password" className="p-1"></input>
              <button onClick={() => handleCreate()} className="text-white">Create</button>
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
