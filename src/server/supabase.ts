'use server'

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

export async function getUser(username: string) {
    var res: any = await supabase.from('users').select('*').eq('username', username)

    if (res.data?.length == 0) {
        await createUser(username)

        res = await supabase.from('users').select('*').eq('username', username)
    }

    return res.data[0]
}

export async function createUser(username: string) {
    const res = await supabase.from('users').upsert([{ username: username, aura: Math.floor(Math.random() * 1000) }])

    return res
}

export async function getLeaderBoardData() {
    const res = await supabase.from('users').select('*').order('aura', { ascending: false })

    return res.data
}