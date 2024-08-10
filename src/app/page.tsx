import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image src="/logo.png" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
