'use client'

import { getLeaderBoardData } from "@/server/supabase";
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
                        <th className="pr-4">Username</th>
                        <th>Aura</th>
                    </tr>
                    {users.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.aura}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}