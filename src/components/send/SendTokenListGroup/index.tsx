"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { tokens } from "@/config";
import { ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";
import { IToken } from "@/type/token";
import { Dispatch, SetStateAction, useEffect } from "react";
import useWallet from "@/hooks/useWallet";
import { formatNumber } from "@/config/formatNumber";
import { formatEther } from "ethers";
import { toast } from "@/components/ui/use-toast";

type SendTokenListGroupProps = {
  token: IToken;
  setToken: Dispatch<SetStateAction<IToken>>;
  address: string;
};
export default function SendTokenListGroup(props: SendTokenListGroupProps) {
  const { token, setToken, address } = props;
  const { address: addressToken, name, symbol, logo, price } = token;

  const { wallet } = useWallet();
  const contract = wallet?.contract;

  const selectToken = async (
    address: string,
    name: string,
    symbol: string,
    logo: string,
    price: string
  ) => {
    setToken((prev) => ({
      ...prev,
      address,
      name,
      symbol,
      logo,
      price,
      balance: "0",
    }));
  };

  const handleGetMaxAmountIn = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      e.stopPropagation();
      if (contract) {
        const amountInMax = await contract.getAmountInMax(addressToken);
        const amountInMaxFormat = formatNumber(
          Number(formatEther(amountInMax))
        ).toString();
        setToken((prev) => ({
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

  useEffect(() => {
    if (contract) {
      const getBalance = async () => {
        try {
          if (addressToken && contract) {
            const balance = await contract.getBalanceOfToken(addressToken);
            const balanceFormat = formatNumber(
              Number(formatEther(balance))
            ).toString();
            setToken((prev) => ({
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
    }
  }, [contract, addressToken, setToken]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between min-w-[120px] rounded-b-2xl bg-accent text-primary py-2 px-6 shadow-sm hover:bg-popover/50 transition-all">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full shadow-sm bg-transparent">
              <Image
                src={logo}
                alt={name}
                height={32}
                width={32}
                className="w-8 h-8"
              />
            </div>
            <div className="flex flex-col">
              <span>{symbol}</span>
              {address ? (
                <span className="text-sm">Balance: {token.balance}</span>
              ) : (
                <span className="text-sm opacity-0">
                  Balance: {token.balance}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="bg-pink-400/20 text-pink-500 rounded-xl p-2 h-6 hover:bg-pink-400/30 hover:text-pink-500/50 transition-colors"
              onClick={handleGetMaxAmountIn}
            >
              Max
            </Button>
            <ChevronDown className=" h-[1.2rem] w-[1.2rem]" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Token list</DialogTitle>
          <DialogDescription>Choose another coin</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-3">
            {tokens.map((token) => {
              const { address, name, symbol, logo, price } = token;
              return (
                <DialogClose asChild key={address}>
                  <Button
                    className="flex items-center justify-between bg-primary-foreground text-primary rounded-2xl px-2 shadow-sm hover:bg-popover hover:shadow-md transition-all"
                    onClick={() =>
                      selectToken(address, name, symbol, logo, price)
                    }
                  >
                    <div className=" w-7 h-7 rounded-full shadow-sm bg-secondary/80">
                      <Image
                        src={logo}
                        alt={name}
                        height={28}
                        width={28}
                        className="w-7 h-7"
                      />
                    </div>
                    <span className="text-sm">{symbol}</span>
                  </Button>
                </DialogClose>
              );
            })}
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
