import { Input } from "@/components/ui/input";
import { IToken } from "@/type/token";
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { toast } from "../ui/use-toast";
import { formatEther } from "ethers";

type SendInputAmountProps = {
  token: IToken;
  setToken: Dispatch<SetStateAction<IToken>>;
  amountIn: string;
};
export default function SendInputAmount(props: SendInputAmountProps) {
  const { token, setToken, amountIn } = props;
  const [amountUsd, setAmountUsd] = useState<string>("");

  const handleChangeAmoutIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToken((prev) => ({ ...prev, amount: value }));
  };

  useEffect(() => {
    const amountInAfterFee = (Number(amountIn) * 102) / 100;
    if (token.balance && token.balance !== "0" && amountInAfterFee > Number(token.balance)) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Not enough token!",
      });
      setToken((prev) => ({ ...prev, amount: "" }));
    }
  }, [amountIn, token.balance, setToken]);

  useEffect(() => {
    const getAmountUsd = () => {
      const priceBigInt = BigInt(token.price);
      const decimalFactor = BigInt(1000000);
      const priceUsdPerWeiBigInt = BigInt(
        Math.round(parseFloat("0.0042") * Number(decimalFactor))
      );
      const amoutInBigInt = BigInt(amountIn);

      const result = priceBigInt * priceUsdPerWeiBigInt * amoutInBigInt;
      setAmountUsd(formatEther(result));
    };
    getAmountUsd();
  }, [amountIn, token.price, setAmountUsd]);

  return (
    <div className="p-6 flex flex-col items-center bg-accent rounded-t-2xl justify-center border-b-2 border-primary-foreground shadow-sm">
      <div className="w-full">
        <span>You&apos;re sending</span>
      </div>
      <div className="flex flex-col items-center mt-6 mb-4 lg:mt-10 lg:mb-6 ">
        <Input
          className=" focus-visible:ring-transparent border-0 focus-visible:ring-offset-0 bg-transparent font-semibold text-8xl text-center py-11"
          placeholder="0"
          value={token.amount}
          onChange={handleChangeAmoutIn}
        />
        <div className="flex items-center gap-2">
          <span className="text-primary/50 ">${amountUsd} USD</span>
          <ArrowUpDown className="h-4 w-4 text-primary/50 " />
        </div>
      </div>
    </div>
  );
}
