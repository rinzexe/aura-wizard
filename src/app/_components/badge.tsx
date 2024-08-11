import { badgeRarities, badges } from "@/consts/badges";

export default function Badge({ badgeid, badgeData }: any) {
    return (
        <div className="p-1 group align-top inline-block *:text-center">
            <div style={{ backgroundColor: badges[badgeid].color }} className={"rounded-full px-3 w-max select-none"}>
                <p className="text-white text-center text-sm">{badges[badgeid].name}</p>
            </div>
            <div className="hidden absolute group-hover:block p-4 translate-x-[-33%]">
                <div className="panel p-2 rounded-lg shadow-lg">
                    <p style={{color: badgeRarities[badges[badgeid].rarity].color}} className="text-xs font-bold">{badgeRarities[badges[badgeid].rarity].name}</p>
                    <p className="text-sm">{badges[badgeid].description}</p>
                    <p className="text-xs text-neutral-400 italic">{"Awarded on " + badgeData.awarded.split('T')[0]}</p>
                </div>
            </div>
        </div>
    )
}