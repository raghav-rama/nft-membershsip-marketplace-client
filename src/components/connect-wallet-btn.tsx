"use client";
import { useWeb3Modal } from "@web3modal/wagmi1/react";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  return (
    <>
      <button onClick={() => open()}>Connect Wallet</button>
    </>
  );
}
