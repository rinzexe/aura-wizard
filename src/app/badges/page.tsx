import Badge from "../_components/badge"

export default function Badges() {
    return (
        <div className="flex flex-col panel max-w-[30rem] items-center *:text-center">
            <h1 className="mb-4">Badges</h1>
            <h2>rinz</h2> 
            <p>
                {"me :3"}
            </p>
            <Badge badgeid={0} badgeData={{ awarded: "2024-08-11 12:59:45.854107+00" }} />
            <h2 className="mt-4">Aura overlord</h2>
            <p>
                {"Awarded to players when they reach #1 on the global leaderboard"}
            </p>
            <Badge badgeid={1} badgeData={{ awarded: "2024-08-11 12:59:45.854107+00" }} />
            <h2 className="mt-4">Aura wizard</h2>
            <p>
            {"Awarded to players when they reach top 10 on the global leaderboard"}
            </p>
            <Badge badgeid={2} badgeData={{ awarded: "2024-08-11 12:59:45.854107+00" }} />
            <h2 className="mt-4">Investor</h2>
            <p>
            {"Awarded to the first 50 users to sign up"}
            </p>
            <Badge badgeid={3} badgeData={{ awarded: "2024-08-11 12:59:45.854107+00" }} />
        </div>
    )
}