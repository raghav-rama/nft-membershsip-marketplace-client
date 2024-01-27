import Image from "next/image";
import ConnectButton from "@/components/connect-wallet-btn";
import Navbar from "@/components/nav-bar";
import CreateNFT from "@/components/create-nft";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <section>
        <Navbar />
      </section>
      <section>
        <CreateNFT />
      </section>
    </main>
  );
}
