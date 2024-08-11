'use server'

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

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
    const res = await supabase.from('users').upsert([object])

    return res
}


export async function getLeaderBoardData(limit: number) {
    const res = await supabase.from('users').select('*').order('aura', { ascending: false }).limit(limit)

    return res.data
}

export async function giveAura(username: string, to: string, amount: number) {
    const user = await getUser(username)
    const toUser = await getUser(to)

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

export async function getBadges(username: string) {
    const badges = await supabase.from('badges').select('*').eq('owner', username)
    return badges.data || []
}

export async function addBadge(username: string, badgeid: number) {
    const currentBadges = await getBadges(username)
    for (var i = 0; i < currentBadges.length; i++) {
        if (currentBadges[i].id == badgeid) {
            return
        }
    }
    console.log(currentBadges)
    const res = await supabase.from('badges').upsert([{ owner: username, id: badgeid }])

    return res
}

export async function channel(update: any) {
    const channel = supabase.channel('realtime updates').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users' }, (payload: any) => { update(false) }).subscribe()

    return channel
}

export async function getSupabase() {
    return supabase
}

export async function updateBadges(user: any) {
    const leaderboardData: any = await getLeaderBoardData(51)

    if (leaderboardData[0].username == user.username) {
        await addBadge(user.username, 1)
    }
    for (var i = 0; i < 10; i++) {
        if (leaderboardData[i].username == user.username) {
            await addBadge(user.username, 2)
            break
        }
    }
    if (leaderboardData.length < 50) {
        await addBadge(user.username, 3)
    }
}