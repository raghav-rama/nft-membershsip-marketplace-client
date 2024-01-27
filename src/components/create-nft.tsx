"use client";
import * as React from "react";
import { useContractRead } from "wagmi";
import { useContractWrite } from "wagmi";
import { sepolia } from "wagmi/chains";
import { abi } from "@/abi/Marketplace.json";
import { parseEther } from "viem";
function CreateNFT() {
  if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
    throw new Error("Missing contract address");
  }
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.substring(2);
  const [name, setName] = React.useState<string>("");
  const [ticker, setTicker] = React.useState<string>("");
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: `0x${contractAddress}`,
    abi,
    functionName: "createToken",
    chainId: sepolia.id,
    args: [name, ticker],
  });
  const handleClick = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    write();
  };
  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <form
          className="flex justify-center items-center w-full h-1/2 flex-col gap-3 p-4 m-auto"
          onSubmit={handleClick}
        >
          <h1 className="md:text-[100px] sm:text-[50px]">
            Create an NFT Membership
          </h1>
          <input
            className="border-solid border-2 border-blue-500 w-[500px] md:w-[300px] h-[50px] rounded-md placeholder:pl-60 text-black"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            className="border-solid border-2 border-blue-500 w-[500px] md:w-[300px] h-[50px] rounded-md placeholder:pl-60 text-black"
            type="text"
            placeholder="Ticker"
            onChange={(e) => setTicker(e.target.value)}
            value={ticker}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-solid border-2 border-blue-500"
            disabled={isLoading}
            type="submit"
          >
            Create Token
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateNFT;
