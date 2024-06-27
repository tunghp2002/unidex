"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../../ui/button";
import { tokens } from "@/config";
import ButtonTrigger from "../ButtonTrigger";
import { Dispatch, SetStateAction } from "react";
import { IToken } from "@/type/token";

type TokenlistProps = {
  firstToken: IToken;
  setFirstToken: Dispatch<SetStateAction<IToken>>;
  secondToken: IToken;
  setSecondToken: Dispatch<SetStateAction<IToken>>;
  isFirst: boolean;
  setIsFirst: Dispatch<SetStateAction<boolean>>;
  isSecond: boolean;
  setIsSecond: Dispatch<SetStateAction<boolean>>;
};

const TokenListSecond = (props: TokenlistProps) => {
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

  const selectToken = async (
    address: string,
    name: string,
    symbol: string,
    logo: string,
    price: string
  ) => {
    try {
      if (address === firstToken.address) {
        let temp = { ...firstToken };
        setFirstToken({ ...secondToken });
        setSecondToken({ ...temp });
        setIsFirst(!isFirst);
        setIsSecond(!isSecond);
      } else {
        setSecondToken((prev) => ({
          ...prev,
          address,
          name,
          symbol,
          logo,
          price,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <ButtonTrigger token={secondToken} />
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
                    <div className=" w-7 h-7 rounded-full shadow-sm">
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

export default TokenListSecond;
