export default function About() {
return(
    <div className="flex panel flex-col max-w-[30rem] items-center *:text-center">
        <h1 className="mb-4">About</h1>
        <h2>What is Aura Wizard dot com?</h2>
        <p>
            {"Aura Wizard calculates your aura based on your Discord profile, among other things. You can then compare your aura with your friends, and mog them... or get"}
        </p>
        <h2 className="mt-4">How is aura calculated?</h2>
        <p>
            {"Aura Wizard scans your profile and calculates your aura based on your profile picture and your username. Aura Wizard uses ai to determine tags for you profile picture, and then calculates your aura based on those tags. There is a full set of rules on the github page that you're welcome to alter anytime"}
        </p>
        <h2 className="mt-4">How do I get more aura?</h2>
        <p>
            {"I'm working on ways to increase your aura, but for now, you can increase your aura by updating your profile picture, and changing your username"}
        </p>
    </div>
)
}