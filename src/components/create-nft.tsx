"use client";
import * as React from "react";
import { useAccount, useContractRead, useDisconnect } from "wagmi";
import { useContractWrite } from "wagmi";
import { sepolia, polygonMumbai } from "wagmi/chains";
import { abi } from "@/abi/Marketplace.json";
import { parseEther } from "viem";
import { type ConnectorData } from "wagmi";
import { CirclesWithBar } from "react-loader-spinner";
function CreateNFT() {
  const { disconnect } = useDisconnect();
  const { connector: activeConnector, isConnected } = useAccount();
  // let contractAddress: string | undefined;
  // let activeChainId: number;
  const [contractAddress, setContractAddress] = React.useState<
    string | undefined
  >();
  const [activeChainId, setActiveChainId] = React.useState<number>();
  const initializeContractAddress = (id: number) => {
    // debugger;
    setActiveChainId(id);
    if (id === sepolia.id) {
      setContractAddress(
        process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS?.substring(2)
      );
    } else if (id === polygonMumbai.id) {
      setContractAddress(
        process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS?.substring(2)
      );
    } else {
      alert("Unsupported chain, choose either sepolia or polygon");
      throw new Error("Unsupported chain");
    }
  };
  React.useEffect(() => {
    // if (isConnected) disconnect();
    console.log("🍄🍄🍄🍄🍄🍄🍄🍄🍄");
    (async () => {
      const activeChainId = await activeConnector?.getChainId();
      if (activeChainId) initializeContractAddress(activeChainId);
      console.log("🍄 id", activeChainId);
      console.log("🍄 contractAddress", contractAddress);
    })();
  }, [activeConnector]);

  React.useEffect(() => {
    const handleChange = (data: ConnectorData) => {
      const id = data.chain?.id;
      if (id) initializeContractAddress(id);
      console.log("🌹 id", activeChainId);
      console.log("🌹 contractAddress", contractAddress);
    };

    activeConnector?.addListener("change", handleChange);

    // Cleanup function
    return () => {
      activeConnector?.removeListener("change", handleChange);
    };
  }, []);

  // if (!contractAddress) {
  //   throw new Error("Missing contract address");
  // }
  const [name, setName] = React.useState<string>("x");
  const [ticker, setTicker] = React.useState<string>("x");
  const { data, isLoading, isSuccess, write, isIdle, variables } =
    useContractWrite({
      address: `0x${contractAddress}`,
      abi,
      functionName: "createToken",
      chainId: activeChainId,
      args: [name, ticker],
    });
  const handleClick = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("🎷 id", activeChainId);
    console.log("🎷 contractAddress", contractAddress);
    console.log("🎷 variables", variables);
    write();
  };
  return (
    <>
      <div className="flex justify-center items-center w-full h-full flex-col">
        <form
          className="flex justify-center items-center w-full h-1/2 flex-col gap-3 p-4"
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
        <div>
          {isLoading ? (
            <div className="flex h-10 justify-center items-center gap-1">
              <Loader /> {"Creating nft..."}
            </div>
          ) : isSuccess ? (
            <TxHashRedirectButton hash={data?.hash} />
          ) : isIdle ? (
            "Create your token to get started"
          ) : (
            "Failed to create your token"
          )}
        </div>
      </div>
    </>
  );
}

const TxHashRedirectButton = ({
  hash,
}: {
  hash: `0x${string}` | undefined;
}) => {
  return (
    <div className="flex  justify-center items-center gap-1">
      <a
        href={`https://mumbai.polygonscan.com/tx/${hash}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 p-4"
      >
        {hash?.toString()}
      </a>
    </div>
  );
};

const Loader = () => {
  return (
    <div>
      <CirclesWithBar
        height="40"
        width="40"
        color="#4fa94d"
        outerCircleColor="#b220d6"
        innerCircleColor="#8c4803"
        barColor="#0cd9e8"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default CreateNFT;
