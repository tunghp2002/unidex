"use client";
import React, { useState } from "react";
import SendInputAmount from "./SendInputAmount";
import SendTokenListGroup from "./SendTokenListGroup";
import { IToken } from "@/type/token";
import { USDT_CONTRACT_ADDRESS } from "@/config";
import SendAddressReceiver from "./SendAddressReceiver";
import SendButton from "./SendButton";
import { useAppSelector } from "@/redux/store";
import useDebounce from "@/hooks/useDebounce";
import SendPopUpConfirm from "./SendPopUpConfirm";

const tokenInit = {
  address: USDT_CONTRACT_ADDRESS,
  name: "Tether",
  symbol: "USDT",
  logo: "/tether-usdt-logo.svg",
  price: "268000000000000",
  amount: "",
  balance: "0",
};

type AddressReceiver = {
  receiver: string;
  isAddress: boolean;
};

const SendCard = () => {
  const [token, setToken] = useState<IToken>(tokenInit);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addressReceiver, setAddressReceiver] = useState<AddressReceiver>({
    receiver: "",
    isAddress: true,
  });
  const amountIn = useDebounce(token.amount, 1000);
  const address = useAppSelector((state) => state.wallet);
  return (
    <div className="flex flex-col justify-center gap-1 min-h-[500px] min-w-fit rounded-3xl border border-primary-foreground shadow-xl ring-2 ring-accent p-2">
      <SendInputAmount token={token} setToken={setToken} amountIn={amountIn} />
      <SendTokenListGroup token={token} setToken={setToken} address={address} />
      <SendAddressReceiver
        addressReceiver={addressReceiver}
        setAddressReceiver={setAddressReceiver}
      />
      <SendButton
        token={token}
        addressReceiver={addressReceiver}
        address={address}
        setIsOpen={setIsOpen}
      />
      <SendPopUpConfirm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        token={token}
        setToken={setToken}
        addressReceiver={addressReceiver}
        setAddressReceiver={setAddressReceiver}
      />
    </div>
  );
};

export default SendCard;
