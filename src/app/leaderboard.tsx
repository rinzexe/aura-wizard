'use client'

import { getLeaderBoardData } from "@/server/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LeaderBoard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getData() {
            const res: any = await getLeaderBoardData()

            setUsers(res)
        }

        getData()
    }, [])

    return (
        <div className="panel">
            <h1>LEADERBOARD</h1>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th className="pr-4">Username</th>
                        <th>Aura</th>
                    </tr>
                    {users.map((user: any) => (
                        <tr key={user.id}>
                            <td>
                                <Image className="rounded-full mr-4" src={user.avatar_url} alt="" width={50} height={50} />
                            </td>
                            <td>{user.username}</td>
                            <td>{user.aura}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}