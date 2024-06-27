import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { DialogTrigger } from "../ui/dialog";

interface ButtonTriggerProps {
  token: {
    address: string;
    name: string;
    symbol: string;
    logo: string;
    price: string;
  };
}

export default function ButtonTrigger(props: ButtonTriggerProps) {
  const { address, name, symbol, logo } = props.token;
  return (
    <DialogTrigger asChild>
      <button className="flex items-center justify-between min-w-[120px] rounded-full bg-primary-foreground text-primary py-1 px-2 shadow-sm hover:bg-popover hover:shadow-md transition-all">
        {
          address ?
          <>
          <div className="relative w-8 h-8 rounded-full shadow-sm">
            <Image
              src={logo}
              alt={name}
              height={32}
              width={32}
              className="w-8 h-8"
            />
            <div className="absolute bottom-[-2px] right-0 z-[1] w-4 h-4 overflow-hidden rounded-md shadow-sm bg-secondary/80 border-2 border-primary-foreground">
              <Image
                src={"/uniswap-uni-logo.svg"}
                alt="logoaa"
                height={16}
                width={16}
                className="w-4 h-4 absolute bottom-[-2px] right-0 z-[1]"
              />
            </div>
          </div>
          <span className="block  text-xl px-1">{symbol}</span>
          <ChevronDown className=" h-[1.2rem] w-[1.2rem]" />
        </> 
        : <span className="text-xl px-3">SELECT</span>
        }
      </button>
    </DialogTrigger>
  );
}
