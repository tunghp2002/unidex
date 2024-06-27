"use client";
import dynamic from "next/dynamic";
import ReverseTokenButton from "./ReverseTokenButton";
import CardItemFirst from "./CardItemFirst";
import CardItemSecond from "./CardItemSecond";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { IToken } from "@/type/token";
import { USDT_CONTRACT_ADDRESS } from "@/config";
import { LoaderCircle } from "lucide-react";
import useWallet from "@/hooks/useWallet";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useAppSelector } from "@/redux/store";

const SwapTokenButton = dynamic(() => import("./SwapTokenButton"), {
  ssr: false,
  loading: () => (
    <Button className="rounded-xl text-xl py-6">
      <span className="pr-1">Loading </span>
      <LoaderCircle className="rotating-infinite" />
    </Button>
  ),
});

const firstTokenInit = {
  address: USDT_CONTRACT_ADDRESS,
  name: "Tether",
  symbol: "USDT",
  logo: "/tether-usdt-logo.svg",
  price: "268000000000000",
  amount: "",
  balance: "0",
};

const secondTokenInit = {
  address: "",
  name: "",
  symbol: "",
  logo: "",
  price: "0",
  amount: "",
  balance: "0",
};

export default function SwapTokenCard() {
  const [firstToken, setFirstToken] = useState<IToken>(firstTokenInit);
  const [secondToken, setSecondToken] = useState<IToken>(secondTokenInit);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isSecond, setIsSecond] = useState<boolean>(false);

  const wallet = useAppSelector((state) => state.wallet);
  useEffect(() => {
    if (!wallet) {
      setFirstToken(firstTokenInit);
      setSecondToken(secondTokenInit);
    }
  }, [wallet]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-86px)]">
      <div className="relative flex flex-col min-w-fit  border-2 border-secondary p-4 rounded-xl gap-2">
        <CardItemFirst
          firstToken={firstToken}
          setFirstToken={setFirstToken}
          secondToken={secondToken}
          setSecondToken={setSecondToken}
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          isSecond={isSecond}
          setIsSecond={setIsSecond}
        />

        <ReverseTokenButton
          firstToken={firstToken}
          setFirstToken={setFirstToken}
          secondToken={secondToken}
          setSecondToken={setSecondToken}
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          isSecond={isSecond}
          setIsSecond={setIsSecond}
        />
        <CardItemSecond
          firstToken={firstToken}
          setFirstToken={setFirstToken}
          secondToken={secondToken}
          setSecondToken={setSecondToken}
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          isSecond={isSecond}
          setIsSecond={setIsSecond}
        />
        <SwapTokenButton
          firstToken={firstToken}
          secondToken={secondToken}
          setFirstToken={setFirstToken}
          setSecondToken={setSecondToken}
        />
      </div>
    </div>
  );
}
