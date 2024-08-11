'use client'

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LeaderBoard from "./leaderboard";
import ProfilePanel from "./_components/profile-panel";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <div className="grid lg:grid-rows-1  gap-12 grid-rows-2 lg:grid-cols-2 w-full max-w-[80rem]">
      <LeaderBoard />
      <ProfilePanel isOwner={true} sessionData={session} sessionStatus={status} />
    </div>
  )
}
