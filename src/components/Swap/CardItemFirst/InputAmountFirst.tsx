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

const InputAmountFirst = (props: InputAmountProps) => {
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

  const changeInputFirstValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFirst(true);
    setIsSecond(false);
    const value = e.target.value;
    setFirstToken((prev) => ({
      ...prev,
      amount: value,
    }));
    setSecondToken((prev) => ({
      ...prev,
      amount: "",
    }));
    if (!firstToken.amount) {
      setSecondToken((prev) => ({
        ...prev,
        amount: "",
      }));
    }
  };

  const inputFirstValue = useDebounce(firstToken.amount, 1000);

  useEffect(() => {
    const getSecondValue = async () => {
      try {
        if (isFirst && inputFirstValue) {
          const valueBigInt = parseEther(inputFirstValue);
          const token1 = ethers.getBigInt(firstToken.price);
          const token2 = ethers.getBigInt(secondToken.price);
          const tokenAddress1 = firstToken.address;
          const tokenAddress2 = secondToken.address;

          if (firstToken.address && secondToken.address && contract) {
            const amountOutBigInt = await contract.getAmountOut(
              tokenAddress1,
              tokenAddress2,
              token1,
              token2,
              valueBigInt
            );
            const valueOut = ethers.formatEther(amountOutBigInt);
            const valueOutFormat = formatNumber(Number(valueOut)).toString();
            setSecondToken((prev) => ({
              ...prev,
              amount: valueOutFormat,
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
    getSecondValue();
  }, [
    inputFirstValue,
    contract,
    firstToken.address,
    secondToken.address,
    firstToken.price,
    secondToken.price,
    setSecondToken,
    isFirst,
  ]);

  return (
    <Input
      className="text-4xl text-primary bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none p-0"
      placeholder="0"
      value={firstToken.amount}
      onChange={changeInputFirstValue}
    />
  );
};

export default InputAmountFirst;
