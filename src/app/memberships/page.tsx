"use client";
import * as React from "react";
import { useAccount, useContractRead } from "wagmi";
import { sepolia } from "viem/chains";
import { abi } from "@/abi/Marketplace.json";
import isAuth from "@/components/is-auth";
import { SanityContext } from "@/context/SanityContext/Sanity";

function Memberships() {
  const { address } = useAccount();
  interface NFT {
    _rev: string;
    _type: string;
    attributes?: Array<{
      _type: string;
      _key: string;
      value: string;
      trait_type: string;
    }>;
    _id: string;
    _updatedAt: string;
    image: string;
    external_url: string;
    _createdAt: string;
    name: string;
    description: string;
  }

  type ApiDataType = NFT;

  const [apiData, setApiData] = React.useState<Array<NFT>>();
  if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
    throw new Error("Missing contract address");
  }

  const { client } = React.useContext(SanityContext);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.substring(2);
  const { data, isLoading, isSuccess } = useContractRead({
    address: `0x${contractAddress}`,
    abi,
    functionName: "fetchUserItems",
    args: [address],
    chainId: sepolia.id,
  });

  const getOwndedNFT = async () => {
    const query = `*[_type == "nft"]`;
    const data = await client.fetch(query);
    console.log("👑 typeof data", typeof data);
    console.log("👑 data", data);
    return data;
  };
  React.useEffect(() => {
    let data;
    (async () => {
      data = await getOwndedNFT();
      setApiData(data);
    })();
  }, []);
  const mapToScreen = (data: Array<ApiDataType>) => {
    return data.map((item) => {
      return (
        <div key={item._id}>
          <h1>{"name: " + item.name}</h1>
          <p>{"image: " + item.image}</p>
          <p>{"description: " + item.description}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Memberships</h1>
      {!apiData ? "loading..." : mapToScreen(apiData)}
    </div>
  );
}

export default Memberships;
// export default isAuth(Memberships);
