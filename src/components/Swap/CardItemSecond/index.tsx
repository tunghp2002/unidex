"use client";
import { ethers } from "ethers";
import { Dispatch, SetStateAction, useEffect } from "react";
import useWallet from "@/hooks/useWallet";
import { IToken } from "@/type/token";
import { formatNumber } from "@/config/formatNumber";
import InputAmountSecond from "./InputAmountSecond";
import TokenListSecond from "./TokenListSecond";
import { toast } from "@/components/ui/use-toast";

type CardItemSecondProps = {
  firstToken: IToken;
  setFirstToken: Dispatch<SetStateAction<IToken>>;
  secondToken: IToken;
  setSecondToken: Dispatch<SetStateAction<IToken>>;
  isFirst: boolean;
  setIsFirst: Dispatch<SetStateAction<boolean>>;
  isSecond: boolean;
  setIsSecond: Dispatch<SetStateAction<boolean>>;
};

const CardItemSecond = (props: CardItemSecondProps) => {
  const {
    firstToken,
    setFirstToken,
    secondToken,
    setSecondToken,
    isFirst,
    setIsFirst,
    isSecond,
    setIsSecond,
  } = props;

  const { wallet } = useWallet();
  const address = wallet?.address;
  const contract = wallet?.contract;

  useEffect(() => {
    const getBalance = async () => {
      try {
        if (secondToken.address && contract) {
          const balance = await contract.getBalanceOfToken(secondToken.address);
          const balanceFormat = formatNumber(
            Number(ethers.formatEther(balance))
          ).toString();
          setSecondToken((prev) => ({
            ...prev,
            balance: balanceFormat,
          }));
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.reason,
        });
      }
    };

    getBalance();
  }, [secondToken, contract, setSecondToken]);

  return (
    <div className="flex flex-col justify-between w-[340px] md:w-[480px] min-h-24 rounded-xl p-4 bg-secondary">
      <span className="text-left text-primary/60 text-sm pb-2">
        You receive
      </span>
      <div className="flex items-center">
        <InputAmountSecond
          firstToken={firstToken}
          setFirstToken={setFirstToken}
          secondToken={secondToken}
          setSecondToken={setSecondToken}
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          isSecond={isSecond}
          setIsSecond={setIsSecond}
        />
        <TokenListSecond
          firstToken={firstToken}
          setFirstToken={setFirstToken}
          secondToken={secondToken}
          setSecondToken={setSecondToken}
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          isSecond={isSecond}
          setIsSecond={setIsSecond}
        />
      </div>
      {address && secondToken.address ? (
        <div className="flex items-center justify-end pt-2">
          <span className="text-right text-primary/60 text-sm">
            Balance: {secondToken.balance}
          </span>
        </div>
      ) : (
        <div className="h-7 pt-2"></div>
      )}
    </div>
  );
};

export default CardItemSecond;
