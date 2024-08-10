'use client'

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LeaderBoard from "./leaderboard";
import ProfilePanel from "./profile-panel";

export default function Home() {
  return (
    <SessionProvider>
      <div className="w-screen h-dvh gap-12 flex flex-col md:justify-center items-center">
          <Image src="/logo.png" alt="Logo" width={400} height={200} />
          <div className="grid grid-rows-1 md:h-[40dvh] gap-12 grid-cols-2 w-full max-w-[80rem]">
            <LeaderBoard />
            <ProfilePanel />
          </div>
      </div>
    </SessionProvider>
  )
}
