"use server"

import axios from "axios";

export async function getDiscordUser(token: string) {
    return await axios.get(`https://discord.com/api/v6/users/@me`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        validateStatus: () => true
    });


}

export async function getDiscordGuilds(token: string) {
    return await axios.get(`https://discord.com/api/v6/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        validateStatus: () => true
    });


}

export async function getDiscordConnections(token: string) {
    return await axios.get(`https://discord.com/api/v6/users/@me/connections`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        validateStatus: () => true
    });
}
