import { IToken } from "@/type/token";
import { ArrowDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
type ReverseTokenButtonProps = {
  firstToken: IToken;
  setFirstToken: Dispatch<SetStateAction<IToken>>;
  secondToken: IToken;
  setSecondToken: Dispatch<SetStateAction<IToken>>;
  isFirst: boolean;
  setIsFirst: Dispatch<SetStateAction<boolean>>;
  isSecond: boolean;
  setIsSecond: Dispatch<SetStateAction<boolean>>;
};
const ReverseTokenButton = (props: ReverseTokenButtonProps) => {
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

  const swapFirstTokenAndSecondToken = () => {
    let temp = { ...firstToken };
    setFirstToken({ ...secondToken });
    setSecondToken({ ...temp });
    setIsFirst(!isFirst);
    setIsSecond(!isSecond);
  };
  
  return (
    <button
      onClick={swapFirstTokenAndSecondToken}
      className="absolute z-[4] top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-2 ring-4 ring-background rounded-lg"
    >
      <ArrowDown className="h-[1.2rem] w-[1.2rem]" />
    </button>
  );
};

export default ReverseTokenButton;
