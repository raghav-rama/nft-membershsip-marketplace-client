"use client";
import * as React from "react";
import { useContractRead } from "wagmi";
import { sepolia } from "viem/chains";
import { abi } from "@/abi/Marketplace.json";
import isAuth from "@/components/is-auth";
import { SanityContext } from "@/context/SanityContext/Sanity";

function Memberships() {
  if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
    throw new Error("Missing contract address");
  }
  const { client } = React.useContext(SanityContext);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.substring(2);
  const { data, isLoading, isSuccess } = useContractRead({
    address: `0x${contractAddress}`,
    abi,
    functionName: "getMemberships",
    chainId: sepolia.id,
  });
  const getOwndedNFT = async () => {
    const query = `*[_type == "nft"]`;
    const data = await client.fetch(query);
    console.log("👑 data", data);
  };
  React.useEffect(() => {
    getOwndedNFT();
  }, []);
  return (
    <div>
      <h1>Memberships</h1>
      <p>{}</p>
    </div>
  );
}

export default isAuth(Memberships);
