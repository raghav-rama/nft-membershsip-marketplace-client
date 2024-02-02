"use client";
import * as React from "react";
import { useAccount, useContractRead } from "wagmi";
import { sepolia, polygonMumbai } from "viem/chains";
import { abi } from "@/abi/Marketplace.json";
import isAuth from "@/components/is-auth";
import { SanityContext } from "@/context/SanityContext/Sanity";

function Memberships() {
  const { address } = useAccount();
  interface NFT {
    _id: string;
    _type: string;
    _rev: string;
    _createdAt: string;
    _updatedAt: string;
    image: string;
    name: string;
    external_url: string;
    description: string;
    attributes?: Array<{
      _type: string;
      _key: string;
      value: string;
      trait_type: string;
    }>;
  }

  type ApiDataType = NFT;

  const [apiData, setApiData] = React.useState<Array<NFT>>();
  if (
    !process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS ||
    !process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS
  ) {
    throw new Error("Missing contract addresses");
  }

  const { client } = React.useContext(SanityContext);
  const sepoliaContractAddress =
    process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS.substring(2);

  const mumbaiContractAddress =
    process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS.substring(2);

  const {
    data: sepoliaData,
    isLoading: sepoliaIsLoading,
    isSuccess: sepoliaIsSuccess,
  } = useContractRead({
    address: `0x${sepoliaContractAddress}`,
    abi,
    functionName: "CollectionAddresses",
    args: [5],
    chainId: sepolia.id,
    onSuccess: (data) => console.log("🎅 sepolia smart contract data", data),
  });
  const {
    data: mumbaiData,
    isLoading: mumbaiIsLoading,
    isSuccess: mumbaiIsSuccess,
  } = useContractRead({
    address: `0x${mumbaiContractAddress}`,
    abi,
    functionName: "getCollectionAddressesLength",
    args: [],
    onSuccess: (data) => console.log("🎅 mumbai smart contract data", data),
  });

  const getOwndedNFT = async () => {
    const query = `*[_type == "nft"]`;
    const data = await client.fetch(query);
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
