'use server'

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

export async function getUser(username: string) {
    var res: any = await supabase.from('users').select('*').eq('username', username)

    if (res.data?.length == 0) {
        await upsertUser({ username: username, aura: Math.floor(Math.random() * 100) })

        res = await supabase.from('users').select('*').eq('username', username)
    }

    return res.data[0]
}

export async function upsertUser({ username, aura, avatar_url }: { username: string, aura?: number, avatar_url?: string }) {
    console.log(username, aura, avatar_url) 
    var object: any = { username: username }
    aura != undefined && (object['aura'] = aura)
    avatar_url != undefined && (object['avatar_url'] = avatar_url)
    const res = await supabase.from('users').upsert([object])

    return res
}


export async function getLeaderBoardData() {
    const res = await supabase.from('users').select('*').order('aura', { ascending: false })

    return res.data
}