'use client'

import axios from "axios";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./components/button";
import { get } from "http";
import { getDiscordConnections, getDiscordGuilds, getDiscordUser } from "./actions";
import { getUser } from "@/server/supabase";

export default function ProfilePanel() {
    const { data: session } = useSession()
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        async function getData() {
            const data: any = {}

            const profileData = await axios.get(`https://discord.com/api/v6/users/@me`, {
                headers: {
                    Authorization: `Bearer ${session?.user.token.accessToken}`
                },
                validateStatus: () => true
            });

            const user: any = await getUser(profileData.data.username)

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

function LoggedInPanel({userData, session}: any) {
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
                        <table>
                            <tbody>
                                <tr>
                                    <td>Aura:</td>
                                    <td>{userData.userData.aura}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            <Button onClick={() => signOut()}>Sign out</Button>
        </div>
    )
}

function LoginPanel() {
    return (
        <div>
            Not signed in <br />
            <Button onClick={() => signIn('discord')}>Sign out</Button>
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