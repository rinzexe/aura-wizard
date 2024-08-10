'use client'

import { getLeaderBoardData, giveAura, supabase } from "@/server/supabase";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./components/button";
import Link from "next/link";

export default function LeaderBoard() {
    const [users, setUsers] = useState([]);
    const { data: session } = useSession()

    useEffect(() => {
        var channel: any = null
        async function getData() {
            const res: any = await getLeaderBoardData()

            setUsers(res)
        }

        getData()

    }, [])

    return (
        <div className="panel overflow-scroll relative">
            <div className="flex flex-row justify-between items-center">
                <h1 className="mb-6">LEADERBOARD</h1>
{/*                 <Link href="/leaderboard">
                    <Button>
                        Open leaderboard
                    </Button>
                </Link> */}
            </div>
            <table className="border-separate border-spacing-x-4 border-spacing-y-2 ">
                <tbody>
                    <tr>
                        <th></th>
                        <th className="">Username</th>
                        <th className="">Aura</th>
                        <th>    </th>
                    </tr>
                    {users?.map((user: any, id: number) => (
                        <tr className="*:align-middle" key={id}>
                            <td>
                                <Image className="rounded-full" src={user.avatar_url} alt="" width={50} height={50} />
                            </td>
                            <td>{user.username}</td>
                            <td>{user.aura}</td>
  {/*                           {user.username != session?.user.name && (
                                <td>
                                    <Button onClick={() => { giveAura(session?.user.name as string, user.username, 1) }}>Give aura</Button>
                                </td>
                            )} */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}