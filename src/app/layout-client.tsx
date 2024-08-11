'use client'

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LeaderBoard from "./leaderboard";
import ProfilePanel from "./_components/profile-panel";
import Link from "next/link";
import { useState } from "react";

export default function LayoutClient({ children }: any) {
    return (
        <SessionProvider>
            <div className="w-screen z-10 min-h-dvh h-full gap-12 flex flex-col justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <Link href="/">
                        <h1 className="md:mt-0 text-white mt-24 select-none hover:cursor-pointer">
                            AuraWizard.com
                        </h1>
                    </Link>
                    <div className="flex flex-row gap-4">
                        <Link href="/about"><p className="!no-underline text-white">About</p></Link>
                        <Link href="/leaderboard"><p className="!no-underline text-white">Leaderboard</p></Link>
                    </div>
                </div>
                {children}
                <div className=" text-sm text-neutral-400  p-8" >
                    Like this project on&nbsp;<Link href="https://github.com/rinzexe/aura-wizard">github</Link>&nbsp;so that I can get hired • Made by&nbsp;<Link href="https://rinz.online">rinz</Link>
                </div>
            </div>
        </SessionProvider>
    )
}
