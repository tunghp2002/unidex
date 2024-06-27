"use client";
import { IToken } from "@/type/token";
import { Button } from "../ui/button";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { Dispatch, SetStateAction } from "react";

type BuyButtonProps = {
  token: IToken;
  ethAmount: string;
  address: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function BuyButton(props: BuyButtonProps) {
  const { token, ethAmount, address, setIsOpen } = props;
  const { open } = useWeb3Modal();

  return (
    <div className="mt-52">
      {address ? (
        <>
          {token.amount && ethAmount ? (
            <Button
              className="w-full rounded-xl text-xl text-white py-6 bg-pink-600 hover:bg-pink-600/90 transition-colors hover:animate-pulse"
              onClick={() => setIsOpen(true)}
            >
              <span className="font-bold">Buy</span>
            </Button>
          ) : (
            <Button
              disabled={true}
              className="w-full rounded-xl text-xl py-6 cursor-not-allowed"
            >
              <span className="font-bold">Enter amount token</span>
            </Button>
          )}
        </>
      ) : (
        <Button
          className="w-full rounded-xl text-xl py-6"
          onClick={() => open()}
        >
          <span className="font-bold">Connect Walet</span>
        </Button>
      )}
    </div>
  );
}
