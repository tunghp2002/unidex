"use client";
import { Button } from "@/components/ui/button";
import { formatEther } from "ethers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useWallet from "@/hooks/useWallet";
import { IToken } from "@/type/token";
import { formatNumber } from "@/config/formatNumber";
import InputAmountFirst from "./InputAmountFirst";
import TokenListFirst from "./TokenListFirst";
import { useAppSelector } from "@/redux/store";
import { toast } from "@/components/ui/use-toast";

type CardItemFirstProps = {
  firstToken: IToken;
  setFirstToken: Dispatch<SetStateAction<IToken>>;
  secondToken: IToken;
  setSecondToken: Dispatch<SetStateAction<IToken>>;
  isFirst: boolean;
  setIsFirst: Dispatch<SetStateAction<boolean>>;
  isSecond: boolean;
  setIsSecond: Dispatch<SetStateAction<boolean>>;
};

const CardItemFirst = (props: CardItemFirstProps) => {
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
  const signer = wallet?.signer;
  const contract = wallet?.contract;

  const address = useAppSelector((state) => state.wallet);

  useEffect(() => {
    const getBalance = async () => {
      try {
        if (firstToken.address && contract) {
          const balance = await contract.getBalanceOfToken(firstToken.address);
          const balanceFormat = formatNumber(
            Number(formatEther(balance))
          ).toString();
          setFirstToken((prev) => ({
            ...prev,
            balance: balanceFormat,
          }));
        }
        if (!address) {
          setFirstToken((prev) => ({
            ...prev,
            balance: "",
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
  }, [contract, firstToken, setFirstToken, address]);

  const handleGetMaxAmoutIn = async () => {
    try {
      if (contract) {
        const amountInMax = await contract.getAmountInMax(firstToken.address);
        const amountInMaxFormat = formatNumber(
          Number(formatEther(amountInMax))
        ).toString();
        setFirstToken((prev) => ({
          ...prev,
          amount: amountInMaxFormat,
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

  return (
    <div className="flex flex-col justify-between w-[340px] md:w-[480px] min-h-24 rounded-xl p-4 bg-secondary">
      <span className="text-left text-primary/60 text-sm pb-2">You pay</span>
      <div className="flex items-center">
        <InputAmountFirst
          firstToken={firstToken}
          setFirstToken={setFirstToken}
          secondToken={secondToken}
          setSecondToken={setSecondToken}
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          isSecond={isSecond}
          setIsSecond={setIsSecond}
        />
        <TokenListFirst
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
      {address && firstToken.address ? (
        <div className="flex items-center justify-end pt-2">
          <span className="text-right text-primary/60 text-sm">
            Balance: {firstToken.balance}
          </span>

          <Button
            className="py-0 px-1 h-5"
            variant={"link"}
            onClick={handleGetMaxAmoutIn}
          >
            Max
          </Button>
        </div>
      ) : (
        <div className="h-7 pt-2"></div>
      )}
    </div>
  );
};

export default CardItemFirst;
