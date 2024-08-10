'use client'

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LeaderBoard from "./leaderboard";
import ProfilePanel from "./profile-panel";
import Link from "next/link";

export default function Home() {
  return (
    <SessionProvider>
      <div className="-z-10 text-sm text-neutral-400 fixed flex items-end h-screen p-8" >
        Like this project on&nbsp;<Link href="https://github.com/rinzexe/aura-wizard">github</Link>&nbsp;so that I can get hired
      </div>
      <div className="w-screen min-h-dvh h-full gap-12 flex flex-col justify-center items-center">
          <div className="grid p-4 lg:grid-rows-1  gap-12 grid-rows-2 lg:grid-cols-2 w-full max-w-[80rem]">
            <LeaderBoard />
            <ProfilePanel />
          </div>
      </div>
    </SessionProvider>
  )
}
