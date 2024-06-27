"use client";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { formatNumber } from "@/config/formatNumber";
import useDebounce from "@/hooks/useDebounce";
import useWallet from "@/hooks/useWallet";
import { IToken } from "@/type/token";
import { parseEther, ethers } from "ethers";
import { Dispatch, SetStateAction, useEffect } from "react";

type InputAmountProps = {
  firstToken: IToken;
  setFirstToken: Dispatch<SetStateAction<IToken>>;
  secondToken: IToken;
  setSecondToken: Dispatch<SetStateAction<IToken>>;
  isFirst: boolean;
  setIsFirst: Dispatch<SetStateAction<boolean>>;
  isSecond: boolean;
  setIsSecond: Dispatch<SetStateAction<boolean>>;
};

const InputAmountSecond = (props: InputAmountProps) => {
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
  const contract = wallet?.contract;

  const changeInputSecondValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFirst(false);
    setIsSecond(true);
    const value = e.target.value;
    setSecondToken((prev) => ({
      ...prev,
      amount: value,
    }));
    setFirstToken((prev) => ({
      ...prev,
      amount: "",
    }));
    if (!secondToken.amount) {
      setFirstToken((prev) => ({
        ...prev,
        amount: "",
      }));
    }
  };
  const inputSecondValue = useDebounce(secondToken.amount, 1000);

  useEffect(() => {
    const getFirstValue = async () => {
      try {
        if (isSecond && inputSecondValue) {
          const valueBigInt = parseEther(inputSecondValue);
          const token1 = ethers.getBigInt(firstToken.price);
          const token2 = ethers.getBigInt(secondToken.price);
          const tokenAddress1 = firstToken.address;
          const tokenAddress2 = secondToken.address;

          if (firstToken.address && secondToken.address && contract) {
            const amountInBigInt = await contract.getAmountIn(
              tokenAddress1,
              tokenAddress2,
              token1,
              token2,
              valueBigInt
            );
            const valueIn = ethers.formatEther(amountInBigInt);
            const valueInFormat = formatNumber(Number(valueIn)).toString();
            setFirstToken((prev) => ({
              ...prev,
              amount: valueInFormat,
            }));
          }
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.reason,
        });
      }
    };
    getFirstValue();
  }, [
    inputSecondValue,
    contract,
    firstToken.address,
    secondToken.address,
    firstToken.price,
    secondToken.price,
    setFirstToken,
    isSecond,
  ]);

  return (
    <Input
      className="text-4xl text-primary bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none p-0"
      placeholder="0"
      value={secondToken.amount}
      onChange={changeInputSecondValue}
    />
  );
};

export default InputAmountSecond;
