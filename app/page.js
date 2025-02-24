"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter()

  
  const [text, setText] = useState("")
  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <main >
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2 ">
        <div className="flex gap-3 justify-center flex-col w-[100%] ml-[7vw] my-[35vh] ">
          <p className="text-[#d2e823] font-extrabold text-7xl font -mb-4">Everything you are.</p>
          <p className="text-[#d2e823] font-bold text-7xl font -mb-4">In one, simple link </p>
          <p className="text-[#d2e823] font-bold text-7xl font">in bio.</p>
          <p className="text-[#d2e823] text-xl my-4 ">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} className="px-3 py-2 focus:outline-green-800 rounded-md pr-10" type="text" placeholder="Entr your handle" />
            <button onClick={() => createTree()} className="bg-[#e9c0e9] rounded-full px-7 py-4 font-semibold">Claim your Bittree</button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mr-[7.8vw]">
          <img src="/home.png" alt="homepage image" />
        </div>
      </section>
      <section className="bg-[red] min-h-[100vh]">

      </section>
    </main>
  );
}
