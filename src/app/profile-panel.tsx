'use client'

import axios from "axios";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "./components/button";
import { get } from "http";
import { getDiscordConnections, getDiscordGuilds, getDiscordUser } from "./actions";
import { getSupabase, getUser, supabase, upsertUser } from "@/server/supabase";
import { calculateAura } from "@/server/aura";
import Tag from "./components/tag";

export default function ProfilePanel() {
    const { data: session } = useSession()
    const [userData, setUserData] = useState<any>(null);

    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        var channel: any = null
        async function getData() {
            const data: any = {}

            const profileData = await axios.get(`https://discord.com/api/v6/users/@me`, {
                headers: {
                    Authorization: `Bearer ${session?.user.token.accessToken}`
                },
                validateStatus: () => true
            });

            const oldUser: any = await getUser(profileData.data.username)

            const oldAvatar = oldUser?.avatar_url

            upsertUser({ username: profileData.data.username, avatar_url: session?.user.image as string })

            const user: any = await getUser(profileData.data.username)

            console.log(oldAvatar)
            console.log(session?.user.image)


            if (oldAvatar != session?.user.image) {
                console.log("calculating aura")
                calculateAura(profileData.data.username, session?.user.image as string)
                setRerender(!rerender)
            }

            data.userData = user;

            data.discordProfileData = profileData.data;

            setUserData(data)
        }

        if (session) {
            getData()
        }


    }, [session])

    return (
        <div className="panel">
            {session ? <LoggedInPanel userData={userData} session={session} /> : <LoginPanel />}
        </div>
    )

}

function LoggedInPanel({ userData, session }: any) {

    return (
        <div className="flex flex-col gap-6">

            {userData && (
                <>
                    <div className="flex flex-row items-center gap-4 w-fit">
                        <Image
                            src={session.user.image as any}
                            alt=""
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                        <h2>
                            {userData.discordProfileData.username}
                        </h2>
                    </div>
                    <div>
                        <p>{"Aura: " + userData.userData.aura}</p>
                        <p>{"Aura recieved: " + userData.userData.aura_recieved}</p>
                        <p>{"Aura given: " + userData.userData.aura_given}</p>
                    </div>
                    <div>
                        <h2>
                            {"Base aura: " + userData.userData.aura_base}
                        </h2>
                        <div className="grid grid-cols-2">
                            <div>
                                <h3>
                                    {"Image rating"}
                                </h3>
                                <div className="inline-block gap-4">
                                    {userData.userData.image_values ? userData.userData.image_values?.map((value: any, id: number) => (
                                        <p key={id} className="text-sm">
                                            {"• " + value.label + " " + (value.value > 0 ? "+" + value.value : value.value)}
                                        </p>
                                    )) : <p>{"No image buffs/debuffs :("}</p>}
                                </div>
                            </div>
                            <div>
                                <h3>
                                    {"Name rating"}
                                </h3>
                                <div className="inline-block gap-4">
                                    {userData.userData.name_values ? userData.userData.name_values?.map((value: any, id: number) => (
                                        <p key={id} className="text-sm">
                                            {"• " + value.label + " " + (value.value > 0 ? "+" + value.value : value.value)}
                                        </p>
                                    )) : <p>{"No name buffs/debuffs :("}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }

            <Button onClick={() => signOut()}>Sign out</Button>
        </div >
    )
}

function LoginPanel() {
    return (
        <div className="relative h-full w-full">
            <div className="absolute bottom-0 left-0 flex rounded-xl bg-black/50 justify-center flex-col gap-4 backdrop-blur-sm items-center w-full h-full z-20">
                <h1>
                    SIGN IN TO SEE YOUR PROFILE
                </h1>
                <Button onClick={() => signIn('discord')}>Sign in</Button>
            </div>
            <div className="flex flex-col gap-6 relative p-4">

                <>
                    <div className="flex flex-row items-center gap-4 w-fit">
                        <Image
                            src={"https://cdn.discordapp.com/avatars/298806030878375936/1f8c3386f0391e1f8d11c710a924813a.png"}
                            alt=""
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                        <h2>
                            rinzexe
                        </h2>
                    </div>
                    <div>
                        <p>{"Aura: " + 2167354}</p>
                        <p>{"Aura recieved: " + 25727}</p>
                        <p>{"Aura given: " + 24582}</p>
                    </div>
                    <div>
                        <h2>
                            {"Base aura: " + 4824824}
                        </h2>
                        <div className="grid grid-cols-2">
                            <div>
                                <h3>
                                    {"Image rating"}
                                </h3>
                                <div className="inline-block gap-4">
                                    <p className="text-sm">
                                        {"• You fuck some ass +100"}
                                    </p>
                                    <p className="text-sm">
                                        {"• EZ4ENCE -100"}
                                    </p>
                                    <p className="text-sm">
                                        {"• It's over bros +100"}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3>
                                    {"Name rating"}
                                </h3>
                                <div className="inline-block gap-4">
                                    <p className="text-sm">
                                        {"• You fuck some ass +100"}
                                    </p>
                                    <p className="text-sm">
                                        {"• EZ4ENCE -100"}
                                    </p>
                                    <p className="text-sm">
                                        {"• It's over bros +100"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

                <Button>Sign out</Button>
            </div >
        </div>
    )
}

{/* <div className="flex flex-col w-fit">
<div className="h-[105px]">
    <Image
        src={"https://cdn.discordapp.com/banners/" + userData.profileData.id + "/" + userData.profileData.banner + ".png?size=480"}
        alt=""
        width={300}
        height={105}
    />
</div>
<div className="absolute mt-[56px] ml-[5px] rounded-full z-10">
    <Image
        src={"https://cdn.discordapp.com/avatar-decoration-presets/" + userData.profileData.avatar_decoration_data.asset + ".png?size=96&passthrough=false"}
        alt=""
        width={90}
        height={90}
        className=""
    />
</div>
<Image
    src={session.user.image as any}
    alt=""
    width={80}
    height={80}
    className="absolute mt-[61px] ml-[10px] rounded-full"
/>
</div> */}