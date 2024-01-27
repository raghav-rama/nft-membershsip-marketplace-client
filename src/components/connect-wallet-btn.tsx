"use client";
import { useWeb3Modal } from "@web3modal/wagmi1/react";
import { useSignMessage } from "wagmi";

export default function ConnectButton() {
  // 4. Use modal hook
  //   const { open } = useWeb3Modal();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "gm wagmi frens",
  });

  return (
    <>
      {/* <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: "Networks" })}>
        Open Network Modal
      </button> */}
      <w3m-button />
      <div>
        <button disabled={isLoading} onClick={() => signMessage()}>
          Sign message
        </button>
        {isSuccess && <div>Signature: {data}</div>}
        {isError && <div>Error signing message</div>}
      </div>
    </>
  );
}
