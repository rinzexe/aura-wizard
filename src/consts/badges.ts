interface Badge {
    name: string;
    description: string;
    icon: string;
    color: string;
    rarity: number;
}

interface Rarity {
    name: string;
    color: string;
}

export const badges: Badge[] = [
    {
        name: "rinz",
        description: "The creator of the website",
        icon: "https://cdn.discordapp.com/attachments/889688352469733141/889688381442383390/aura_bender.png",
        color: "#750014",
        rarity: 0
    },
    {
        name: "Aura overlord",
        description: "Reached #1 at any point in time",
        icon: "https://cdn.discordapp.com/attachments/889688352469733141/889688381442383390/aura_bender.png",
        color: "#0087e0",
        rarity: 1
    },
    {
        name: "Aura wizard",
        description: "Reached top 10 at any point in time",
        icon: "https://cdn.discordapp.com/attachments/889688352469733141/889688381442383390/aura_bender.png",
        color: "#1600e0",
        rarity: 2
    },
    {
        name: "Investor",
        description: "Was one of the first 50 users that signed up",
        icon: "https://cdn.discordapp.com/attachments/889688352469733141/889688381442383390/aura_bender.png",
        color: "#8700e0",
        rarity: 2
    },
]

export const badgeRarities: Rarity[] = [
    {
        name: "rinz",
        color: "#ff0000"
    },
    {
        name: "Legendary",
        color: "#ffea05"
    },
    {
        name: "Rare",
        color: "#2969ff"
    },
    {
        name: "Common",
        color: "#bfbfbf"
    },
]