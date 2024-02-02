"use client";
import Link from "next/link";
import * as React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ConnectButton from "./connect-wallet-btn";
import { useWeb3ModalEvents } from "@web3modal/wagmi1/react";
import { useAccount } from "wagmi";
import { useSignMessage } from "wagmi";
import { NavBarContext } from "@/context/NavBarContext/NavBar";
import { AuthContext } from "@/context/AuthContext/Auth";
import { SanityContext } from "@/context/SanityContext/Sanity";
import { v4 as uuidv4 } from "uuid";
import { recoverMessageAddress } from "viem";

const Navbar = () => {
  const { address } = useAccount();

  const { client } = React.useContext(SanityContext);

  const {
    data: signMessageData,
    error,
    isLoading,
    signMessage,
    isSuccess,
    variables,
  } = useSignMessage();

  const {
    nav,
    setNav,
    setConnected,
    setConnectClicked,
    connected,
    connectClicked,
    links,
    setRecoveredAddress,
  } = React.useContext(NavBarContext);

  const getUser = async () => {
    const query = `*[_type == "users" && walletAddress == "${address}"]`;
    const data = await client.fetch(query);
    console.log("👑 data", data);
    return data;
  };

  const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
  // this will be our nonce

  const { isAuth, setIsAuth } = React.useContext(AuthContext);
  {
    const { data } = useWeb3ModalEvents();
    React.useEffect(() => {
      console.log("👑 data.event", data.event);
      if (data.event === "CONNECT_SUCCESS" && !isAuth && connectClicked) {
        console.log("👑 data", data);
        (async () => {
          let data = await getUser();
          if (data.length > 0) {
            let nonce = await data[0].nonce;
            console.log("👑 nonce", nonce);
            signMessage({ message: "Login to Mintpass" + nonce });
          } else {
            console.log("👑 randomNumber", randomNumber);
            signMessage({ message: "Login to Mintpass" + randomNumber });
          }
        })();
        setConnected(true);
        setConnectClicked(false);
      }
      if (data.event === "MODAL_OPEN") {
        setConnectClicked(true);
      }
      if (data.event === "DISCONNECT_SUCCESS") {
        setConnected(false);
        setIsAuth(false);
      }
    }, [data.event]);
  }
  React.useEffect(() => {
    console.log("👑 isSuccess changed, isAuth", isSuccess, isAuth);
    if (isSuccess) {
      (async () => {
        let data = await getUser();
        if (data.length > 0) {
          console.log("👑 data", data);
          let signature = await data[0].signature;
          console.log("👑 signature", signature);
          if (signature === signMessageData) {
            setIsAuth(true);
            console.log("👑 authenticated");
          } else {
            client
              .patch(data[0]._id)
              .set({ signature: signMessageData })
              .commit()
              .then((res) => {
                console.log("👑 user patched", res);
                setIsAuth(true);
              });
          }
        } else {
          const user = {
            _id: uuidv4(),
            _type: "users",
            name: "Sneeky Pete",
            walletAddress: address,
            nonce: randomNumber,
            signature: signMessageData,
          };
          (async () => {
            await client.createIfNotExists(user).then((res) => {
              console.log("👑 res", res);
              setIsAuth(true);
            });
          })();
        }
      })();
      console.log("👑 signMessageData", signMessageData);
    }
  }, [isSuccess]);
  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            Mintpass
          </a>
        </h1>
      </div>
      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{link}</Link>
          </li>
        ))}
      </ul>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* <div className="px-4">
        {data.event === "CONNECT_SUCCESS" ? "x" : <ConnectButton />}
      </div> */}

      <w3m-button />
    </div>
  );
};

export default Navbar;
