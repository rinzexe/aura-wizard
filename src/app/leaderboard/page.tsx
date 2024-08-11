'use client'

import { getLeaderBoardData } from "@/server/supabase";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LeaderBoard() {
    const [users, setUsers] = useState([]);
    const { data: session } = useSession()

    useEffect(() => {
        var channel: any = null
        async function getData() {
            const res: any = await getLeaderBoardData(999)

            setUsers(res)
        }

        getData()
    }, [])

    return (
        <div className="flex panel flex-col max-w-96 items-center *:text-center">
            <h1 className="mb-4">Leaderboard</h1>
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
                            <Link href={"/profile/" + user.username}>
                                <td className="font-bold text-white select-none hover:cursor-pointer">{user.username}</td>
                            </Link>
                            <td>{user.aura}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}