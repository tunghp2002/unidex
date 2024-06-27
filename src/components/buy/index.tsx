"use client";
import { AlignJustify, CheckCheck } from "lucide-react";
import BuyCardInputGroup from "./BuyCardInputGroup";
import { IToken } from "@/type/token";
import { useState } from "react";
import { USDT_CONTRACT_ADDRESS } from "@/config";
import { useAppSelector } from "@/redux/store";
import BuyButton from "./BuyButton";
import PopUpConfirm from "./PopUpConfirm";
import useWallet from "@/hooks/useWallet";
import { parseEther } from "ethers";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

const tokenInit = {
  address: USDT_CONTRACT_ADDRESS,
  name: "Tether",
  symbol: "USDT",
  logo: "/tether-usdt-logo.svg",
  price: "268000000000000",
  amount: "",
  balance: "0",
};

export default function BuyCard() {
  const [token, setToken] = useState<IToken>(tokenInit);
  const [ethAmount, setEthAmount] = useState<string>("");
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const address = useAppSelector((state) => state.wallet);
  const { wallet } = useWallet();
  const contract = wallet?.contract;
  const provider = wallet?.ethersProvider;
  const handleBuy = async () => {
    try {
      if (contract && ethAmount) {
        const amountInBigInt = parseEther(ethAmount);
        const priceBigInt = BigInt(token.price);
        const addressToken = token.address;

        const amountOutBigInt = await contract.BuyTokenWithETH(
          addressToken,
          priceBigInt,
          { value: amountInBigInt }
        );

        toast({
          title: "Successful",
          autoFocus: true,
          className: "bg-accent/50",
          description: `Successfully purchased ${token.amount} ${token.symbol}!`,
          action: (
            <ToastAction
              altText="Successful"
              className="bg-green-300/50 rounded-xl p-1"
            >
              <CheckCheck className="text-green-500" />
            </ToastAction>
          ),
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.reason,
      });
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-[600px] min-w-fit bg-accent/40 rounded-3xl border border-primary-foreground shadow-xl">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg">Buy</span>
        <AlignJustify />
      </div>
      <BuyCardInputGroup
        token={token}
        setToken={setToken}
        ethAmount={ethAmount}
        setEthAmount={setEthAmount}
        address={address}
        isFirst={isFirst}
        setIsFirst={setIsFirst}
      />
      <BuyButton
        token={token}
        ethAmount={ethAmount}
        address={address}
        setIsOpen={setIsOpen}
      />
      <PopUpConfirm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleBuy={handleBuy}
      />
    </div>
  );
}
