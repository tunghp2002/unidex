import { IToken } from "@/type/token";
import { Input } from "../../ui/input";
import { Dispatch, SetStateAction, useEffect } from "react";
import BuyTokenList from "./BuyTokenList";
import Image from "next/image";
import { Asterisk } from "lucide-react";
import GroupButtonQuantity from "./GroupButtonQuantity";
import useDebounce from "@/hooks/useDebounce";
import useWallet from "@/hooks/useWallet";
import { ethers, parseEther } from "ethers";
import { formatNumber } from "@/config/formatNumber";
import { toast } from "@/components/ui/use-toast";

type BuyCardInputGroupProps = {
  token: IToken;
  setToken: Dispatch<SetStateAction<IToken>>;
  ethAmount: string;
  setEthAmount: Dispatch<SetStateAction<string>>;
  address: string;
  isFirst: boolean;
  setIsFirst: Dispatch<SetStateAction<boolean>>;
};

const BuyCardInputGroup = (props: BuyCardInputGroupProps) => {
  const {
    token,
    setToken,
    ethAmount,
    setEthAmount,
    address,
    isFirst,
    setIsFirst,
  } = props;
  const { wallet } = useWallet();
  const contract = wallet?.contract;
  const provider = wallet?.ethersProvider;

  const handleChangeAmoutIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFirst(true);
    setEthAmount(e.target.value);
    setToken((prev) => ({ ...prev, amount: "" }));
    if (ethAmount) {
      setToken((prev) => ({ ...prev, amount: "" }));
    }
  };

  const handleChangeAmoutOut = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFirst(false);
    setToken((prev) => ({ ...prev, amount: e.target.value }));
    // setEthAmount("");
  };

  const amountIn = useDebounce(ethAmount, 1000);
  const amountOut = useDebounce(token.amount, 1000);

  useEffect(() => {
    try {
      const getAmountOut = async () => {
        if (contract && amountIn && isFirst) {
          const amountInBigInt = parseEther(amountIn);
          const amountOutBigInt = await contract.getEthAmountOut(
            token.address,
            amountInBigInt,
            BigInt(token.price)
          );
          const amountOut = ethers.formatEther(amountOutBigInt);
          const amoutOutFormat = formatNumber(Number(amountOut)).toString();
          setToken((prev) => ({ ...prev, amount: amoutOutFormat }));
        }
      };
      getAmountOut();
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.reason,
      });
    }
  }, [amountIn, contract, token.address, token.price, setToken, isFirst]);

  useEffect(() => {
    try {
      const getAmountIn = async () => {
        if (contract && amountOut && provider && !isFirst) {
          const amountOutBigInt = parseEther(amountOut);
          const amountInBigInt = await contract.getEthAmountIn(
            token.address,
            amountOutBigInt,
            BigInt(token.price)
          );
          const amountIn = ethers.formatEther(amountInBigInt);
          const balance = await provider.getBalance(address);
          if (Number(amountIn) >= balance) {
            setToken((prev) => ({ ...prev, amount: "" }));
            setEthAmount("");
            return toast({
              title: "Error",
              variant: "destructive",
              description: "Don't have enough sepolia ETH!",
            });
          }
          const amountInFormat = formatNumber(Number(amountIn)).toString();
          setEthAmount(amountInFormat);
        }
      };
      getAmountIn();
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.reason,
      });
    }
  }, [
    amountOut,
    address,
    contract,
    provider,
    setToken,
    setEthAmount,
    token.address,
    token.price,
    isFirst,
  ]);

  return (
    <div className="flex flex-col justify-center gap-4 mt-8">
      <div className="w-full flex items-center justify-between p-3 bg-accent rounded-xl">
        <Input
          className=" focus-visible:ring-transparent border-0 focus-visible:ring-offset-0 bg-transparent font-semibold text-2xl"
          placeholder="0"
          value={ethAmount}
          onChange={handleChangeAmoutIn}
        />
        <div className="flex items-center justify-between  min-w-[120px] rounded-full bg-primary-foreground text-primary py-1 px-2 shadow-sm hover:bg-popover hover:shadow-md transition-all">
          <Image
            src={"/ethereum-eth-logo.svg"}
            alt="eth"
            height={32}
            width={32}
            className="w-8 h-8"
          />
          <span className="text-lg px-1">ETH</span>
          <Asterisk className=" h-[1.2rem] w-[1.2rem]" />
        </div>
      </div>
      <div className="w-full flex items-center justify-between p-3 bg-accent rounded-xl">
        <Input
          className=" focus-visible:ring-transparent border-0 focus-visible:ring-offset-0 bg-transparent font-semibold text-2xl"
          placeholder="0"
          value={token.amount}
          onChange={handleChangeAmoutOut}
        />
        <BuyTokenList token={token} setToken={setToken} />
      </div>
      <GroupButtonQuantity setToken={setToken} />
    </div>
  );
};

export default BuyCardInputGroup;
