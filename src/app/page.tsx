import Image from "next/image";
import ConnectButton from "@/components/connect-wallet-btn";
import Navbar from "@/components/nav-bar";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      {/* <ConnectButton /> */}
      <Navbar />
    </main>
  );
}
