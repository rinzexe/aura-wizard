

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_KEY as string);

export async function getUser(username: string) {
    var res: any = await supabase.from('users').select('*').eq('username', username)

    return res.data?.length != 0 ? res.data[0] : null
}

// really gotta find a way to make this function better
export async function upsertUser({ username, aura, avatar_url, aura_base, name_values, image_values }: { username: string, aura?: number, avatar_url?: string, aura_base?: number, name_values?: any, image_values?: any }) {
    var object: any = { username: username }
    aura != undefined && (object['aura'] = aura)
    aura_base != undefined && (object['aura_base'] = aura_base)
    avatar_url != undefined && (object['avatar_url'] = avatar_url)
    image_values != undefined && (object['image_values'] = image_values)
    name_values != undefined && (object['name_values'] = name_values)
    console.log(object)
    const res = await supabase.from('users').upsert([object])

    return res
}


export async function getLeaderBoardData() {
    const res = await supabase.from('users').select('*').order('aura', { ascending: false }).limit(10)

    return res.data
}

export async function giveAura(username: string, to: string, amount: number) {
    const user = await getUser(username)
    const toUser = await getUser(to)

    console.log(amount)
    console.log(toUser)

    if (user && toUser) {
        const res = await supabase.from('users').upsert([
            {
                username: username,
                aura: user.aura - amount,
                aura_given: user.aura_given + amount
            },
            {
                username: to,
                aura: toUser.aura + amount,
                aura_recieved: toUser.aura_recieved + amount
            }
        ])

        return res
    }
}

export async function channel(update: any) {
    const channel = supabase.channel('realtime updates').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users' }, (payload: any) => { update(false) }).subscribe()

    return channel
}

export async function getSupabase() {
    return supabase
}