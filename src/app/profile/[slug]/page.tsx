import ProfilePanel from "@/app/_components/profile-panel";

export default function Profile({ params }: { params: { slug: string } }) {
    return (
        <ProfilePanel isOwner={false} username={params.slug} />
    )
}