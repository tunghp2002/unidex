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

import { Dispatch, SetStateAction } from "react";
import { IToken } from "@/type/token";
import { ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";

type TokenlistProps = {
  token: IToken;
  setToken: Dispatch<SetStateAction<IToken>>;
};

const SendTokenList = (props: TokenlistProps) => {
  const { token, setToken } = props;
  const { address, name, symbol, logo, price } = token;

  const selectToken = async (
    address: string,
    name: string,
    symbol: string,
    logo: string,
    price: string
  ) => {
    setToken({ address, name, symbol, logo, price });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-between min-w-[120px] rounded-full bg-primary-foreground text-primary py-1 px-2 shadow-sm hover:bg-popover hover:shadow-md transition-all">
          <div className="relative w-8 h-8 rounded-full shadow-sm bg-transparent">
            <Image
              src={logo}
              alt={name}
              height={32}
              width={32}
              className="w-8 h-8"
            />
          </div>
          <span>{symbol}</span>
          <ChevronDown className=" h-[1.2rem] w-[1.2rem]" />
        </button>
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
};

export default SendTokenList;
