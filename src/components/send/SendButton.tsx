"use client";
import { IToken } from "@/type/token";
import { Button } from "../ui/button";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { Dispatch, SetStateAction } from "react";

type AddressReceiver = {
  receiver: string;
  isAddress: boolean;
};
type BuyButtonProps = {
  token: IToken;
  addressReceiver: AddressReceiver;
  address: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SendButton(props: BuyButtonProps) {
  const { token, addressReceiver, address, setIsOpen } = props;
  const { open } = useWeb3Modal();

  return (
    <div className="">
      {address ? (
        <>
          {token.amount &&
          addressReceiver.receiver &&
          addressReceiver.isAddress ? (
            <Button
              className="w-full rounded-2xl text-xl text-white px-4 py-10 bg-pink-600 hover:bg-pink-600/90 transition-colors hover:animate-pulse"
              onClick={() => setIsOpen(true)}
            >
              <span className="font-bold text-primary">Send</span>
            </Button>
          ) : (
            <Button
              disabled={true}
              className="w-full rounded-2xl text-xl bg-accent px-4 py-10 cursor-not-allowed"
            >
              <span className="font-bold text-primary">
                Enter amount token and address receiver
              </span>
            </Button>
          )}
        </>
      ) : (
        <Button
          className="w-full rounded-2xl text-xl bg-accent px-4 py-10"
          onClick={() => open()}
        >
          <span className="font-bold text-primary">Connect Walet</span>
        </Button>
      )}
    </div>
  );
}
