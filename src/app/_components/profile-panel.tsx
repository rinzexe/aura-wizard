'use client'

import axios from "axios";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "./button";
import { getBadges, getSupabase, getUser, updateBadges, upsertUser } from "@/server/supabase";
import { calculateAura } from "@/server/aura";
import Badge from "./badge";

export default function ProfilePanel({ sessionData, sessionStatus, isOwner, username }: any) {
    function DisplayPanel() {
        if (isOwner == true) {
            return <OwnerPanel sessionData={sessionData} sessionStatus={sessionStatus} />
        }
        else {
            return <GuestPanel username={username} />
        }
    }
    return (
        <DisplayPanel />
    )
}

function GuestPanel({ username }: any) {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        async function getData() {
            var data: any = {}

            const user: any = await getUser(username)
            const badgeRes = await updateBadges(user)
            const badges: any = await getBadges(username)

            data = user;
            data.badges = badges

            setUserData(data)
        }

        getData()

    }, [username])

    function DisplayedPanel() {

        if (userData) {
            return <Panel userData={userData} isOwner={false} />
        }
        else {
            return <Skeleton><h1>CALCULATING AURA...</h1></Skeleton>
        }


    }
    return (
        <div className="panel">
            <DisplayedPanel />
        </div>
    )
}

function OwnerPanel({ sessionData, sessionStatus }: any) {
    const [userData, setUserData] = useState<any>(null);

    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        async function getData() {
            var data: any = {}

            const profileData = await axios.get(`https://discord.com/api/v6/users/@me`, {
                headers: {
                    Authorization: `Bearer ${sessionData?.user.token.accessToken}`
                },
                validateStatus: () => true
            });

            const oldUser: any = await getUser(profileData.data.username)

            const oldAvatar = oldUser?.avatar_url

            upsertUser({ username: profileData.data.username, avatar_url: sessionData?.user.image as string })

            if (oldAvatar != sessionData?.user.image) {
                calculateAura(profileData.data.username, sessionData?.user.image as string)
                setRerender(!rerender)
            }

            const user: any = await getUser(profileData.data.username)

            const badgeRes = await updateBadges(user)

            const badges: any = await getBadges(profileData.data.username)

            data = user;
            data.badges = badges

            setUserData(data)
        }

        if (sessionData) {
            getData()
        }


    }, [sessionData])

    function DisplayedPanel() {
        switch (sessionStatus) {
            case 'loading':
                return <Skeleton><h1>LOADING...</h1></Skeleton>
            case 'authenticated':
                if (userData) {
                    return <Panel userData={userData} isOwner={true} />
                }
                else {
                    return <Skeleton><h1>CALCULATING AURA...</h1></Skeleton>
                }
            case 'unauthenticated':
                return <LoginPanel />
        }
    }

    return (
        <div className="panel">
            <DisplayedPanel />
        </div>
    )
}

function Panel({ userData, isOwner }: any) {
    return (
        <div className="flex flex-col gap-6">

            <div className="flex flex-row justify-between items-center gap-4">
                <div className="flex flex-row items-center gap-4">
                    <Image
                        src={userData.avatar_url as any}
                        alt=""
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                    <h2 style={{ overflowWrap: "anywhere" }} className="text break-all text-wrap">
                        {userData.username}
                    </h2>
                </div>
                <div>
                    <h2>{"Aura: " + userData.aura}</h2>
                </div>
            </div>
            <div className="w-full">
                {userData.badges?.map((badge: any, id: number) => (
                    <Badge key={id} badgeid={badge.id} badgeData={badge} />
                ))}
            </div>
            <div>
                <h2>
                    {"Base aura: " + userData.aura_base}
                </h2>
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        <h3>
                            {"Image rating"}
                        </h3>
                        <div className="inline-block gap-4">
                            {userData.image_values.length != 0 ? userData.image_values?.map((value: any, id: number) => (
                                <p key={id} className="text-sm">
                                    {"• " + value.label + " " + (value.value > 0 ? "+" + value.value : value.value)}
                                </p>
                            )) : <p className="text-sm">{"No image buffs/debuffs :("}</p>}
                        </div>
                    </div>
                    <div>
                        <h3>
                            {"Name rating"}
                        </h3>
                        <div className="inline-block gap-4">
                            {userData.name_values.length != 0 ? userData.name_values?.map((value: any, id: number) => (
                                <p key={id} className="text-sm">
                                    {"• " + value.label + " " + (value.value > 0 ? "+" + value.value : value.value)}
                                </p>
                            )) : <p className="text-sm">{"No name buffs/debuffs :("}</p>}
                        </div>
                    </div>
                </div>
                {isOwner == true && (<p className="text-xs mt-2 text-neutral-400">
                    <i>
                        Update your profile picture to recalculate your aura
                    </i>
                </p>)}
            </div>
            {isOwner == true && (<Button onClick={() => signOut()}>Sign out</Button>)}
        </div >
    )
}


function LoginPanel() {
    return (
        <div className="relative h-full w-full">
            <Skeleton>
                <h1>
                    SIGN IN TO CALCULATE AURA
                </h1>
                <Button onClick={() => signIn('discord')}>Sign in</Button>
            </Skeleton>
        </div>
    )
}

function Skeleton({ children }: any) {
    const userData = {
        username: "rinzexe",
        aura: "69",
        aura_base: "69",
        avatar_url: "https://cdn.discordapp.com/avatars/298806030878375936/1f8c3386f0391e1f8d11c710a924813a.png",
        image_values: [
            {
                "name": "background",
                "label": "Side character",
                "value": -50
            },
            {
                "name": "abstract",
                "label": "Schizophrenic bonus",
                "value": 64
            },
            {
                "name": "vector",
                "label": "Vector art debuff",
                "value": -14
            }
        ],
        name_values: [
            {
                "label": "Lowercase bonus",
                "value": 10
            },
            {
                "label": "Dot swag",
                "value": 18
            },
            {
                "label": "God's will",
                "value": 5
            }
        ]
    }
    return (
        <div className="flex flex-col gap-6 relative p-4">
            <div className="absolute bottom-0 left-0 flex rounded-xl bg-black/50 justify-center flex-col gap-4 backdrop-blur-sm items-center w-full h-full z-20">
                {children}
            </div>
            <Panel userData={userData} />
            <Button>Sign out</Button>
        </div >
    )
}