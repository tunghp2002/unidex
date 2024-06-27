"use client";
import { useAppSelector } from "@/redux/store";
import { Button } from "../ui/button";
import useWallet from "@/hooks/useWallet";
import { ethers, parseEther } from "ethers";
import useTokenContract from "@/hooks/useTokenContract";
import { IToken } from "@/type/token";
import {
  ADA_CONTRACT_ADDRESS,
  CONTRACT_ADDRESS,
  LINK_CONTRACT_ADDRESS,
  TON_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
} from "@/config";
import { ToastAction } from "@radix-ui/react-toast";
import { CheckCheck } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { toast } from "../ui/use-toast";

type SwapTokenButtonProps = {
  firstToken: IToken;
  secondToken: IToken;
  setFirstToken: Dispatch<SetStateAction<IToken>>;
  setSecondToken: Dispatch<SetStateAction<IToken>>;
};

const SwapTokenButton = (props: SwapTokenButtonProps) => {
  const { open } = useWeb3Modal();
  const { firstToken, secondToken, setFirstToken, setSecondToken } = props;
  const address = useAppSelector((state) => state.wallet);
  const { wallet } = useWallet();
  const contract = wallet?.contract;
  const provider = wallet?.ethersProvider;
  const tokenContract = useTokenContract();
  const cardanoContract = tokenContract?.cardanoContract;
  const tetherContract = tokenContract?.tetherContract;
  const linkContract = tokenContract?.linkContract;
  const tonContract = tokenContract?.tonContract;

  const resetInput = () => {
    setFirstToken((prev) => ({
      ...prev,
      amount: "",
    }));
    setSecondToken((prev) => ({
      ...prev,
      amount: "",
    }));
  };

  const handleWrap = async () => {
    try {
      if (firstToken.address === ADA_CONTRACT_ADDRESS) {
        if (
          contract &&
          cardanoContract &&
          firstToken.amount &&
          secondToken.amount
        ) {
          const approveTx = await cardanoContract.approve(
            CONTRACT_ADDRESS,
            BigInt(parseEther(firstToken.amount))
          );

          toast({
            title: "Wait",
            className: "bg-accent/50",
            description: "Please wait for transaction !",
          });
          await provider?.waitForTransaction(approveTx.hash);
          const swapTokenTx = await contract.swapToken(
            firstToken.address,
            secondToken.address,
            BigInt(parseEther(firstToken.amount)),
            BigInt(parseEther(secondToken.amount))
          );
          toast({
            title: "Successful",
            autoFocus: true,
            className: "bg-accent/50",
            description: "Please wait for transaction !",
            action: (
              <ToastAction
                altText="Successful"
                className="bg-green-300/50 rounded-xl p-1"
              >
                <CheckCheck className="text-green-500" />
              </ToastAction>
            ),
          });
          resetInput();
          // await provider?.waitForTransaction(swapTokenTx);
        }
      }

      if (firstToken.address === USDT_CONTRACT_ADDRESS) {
        if (
          contract &&
          tetherContract &&
          firstToken.amount &&
          secondToken.amount
        ) {
          const approveTx = await tetherContract.approve(
            CONTRACT_ADDRESS,
            BigInt(parseEther(firstToken.amount))
          );
          toast({
            title: "Wait",
            className: "bg-accent/50",
            description: "Please wait for transaction !",
          });
          await provider?.waitForTransaction(approveTx.hash);
          const swapTokenTx = await contract.swapToken(
            firstToken.address,
            secondToken.address,
            BigInt(parseEther(firstToken.amount)),
            BigInt(parseEther(secondToken.amount))
          );
          toast({
            title: "Successful",
            autoFocus: true,
            className: "bg-accent/50",
            description: "Please wait for transaction !",
            action: (
              <ToastAction
                altText="Successful"
                className="bg-green-300/50 rounded-xl p-1"
              >
                <CheckCheck className="text-green-500" />
              </ToastAction>
            ),
          });
          resetInput();
          // await provider?.waitForTransaction(swapTokenTx);
        }
      }

      if (firstToken.address === TON_CONTRACT_ADDRESS) {
        if (
          contract &&
          tonContract &&
          firstToken.amount &&
          secondToken.amount
        ) {
          const approveTx = await tonContract.approve(
            CONTRACT_ADDRESS,
            BigInt(parseEther(firstToken.amount))
          );
          toast({
            title: "Wait",
            className: "bg-accent/50",
            description: "Please wait for transaction !",
          });
          await provider?.waitForTransaction(approveTx.hash);
          const swapTokenTx = await contract.swapToken(
            firstToken.address,
            secondToken.address,
            BigInt(parseEther(firstToken.amount)),
            BigInt(parseEther(secondToken.amount))
          );
          toast({
            title: "Successful",
            autoFocus: true,
            className: "bg-accent/50",
            description: "Please wait for transaction !",
            action: (
              <ToastAction
                altText="Successful"
                className="bg-green-300/50 rounded-xl p-1"
              >
                <CheckCheck className="text-green-500" />
              </ToastAction>
            ),
          });
          resetInput();
          // await provider?.waitForTransaction(swapTokenTx);
        }
      }

      if (firstToken.address === LINK_CONTRACT_ADDRESS) {
        if (
          contract &&
          linkContract &&
          firstToken.amount &&
          secondToken.amount
        ) {
          const approveTx = await linkContract.approve(
            CONTRACT_ADDRESS,
            BigInt(parseEther(firstToken.amount))
          );
          toast({
            title: "Wait",
            className: "bg-accent/50",
            description: "Please wait for transaction !",
          });
          await provider?.waitForTransaction(approveTx.hash);
          const swapTokenTx = await contract.swapToken(
            firstToken.address,
            secondToken.address,
            BigInt(parseEther(firstToken.amount)),
            BigInt(parseEther(secondToken.amount))
          );
          toast({
            title: "Successful",
            autoFocus: true,
            className: "bg-accent/50",
            description: "Please wait for transaction !",
            action: (
              <ToastAction
                altText="Successful"
                className="bg-green-300/50 rounded-xl p-1"
              >
                <CheckCheck className="text-green-500" />
              </ToastAction>
            ),
          });
          resetInput();
          // await provider?.waitForTransaction(swapTokenTx);
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.reason,
      });
      console.log(error);
    }
  };
  return (
    <>
      {address ? (
        <>
          {firstToken.address && secondToken.address ? (
            <>
              {firstToken.amount && secondToken.amount ? (
                <Button
                  className="rounded-xl text-xl text-white py-6 bg-pink-600 hover:bg-pink-600/90 transition-colors hover:animate-pulse"
                  onClick={handleWrap}
                >
                  <span className="font-bold">Wrap</span>
                </Button>
              ) : (
                <Button
                  disabled={true}
                  className="rounded-xl text-xl py-6 cursor-not-allowed"
                >
                  <span className="font-bold">Enter amount token</span>
                </Button>
              )}
            </>
          ) : (
            <Button disabled={true} className="rounded-xl text-xl py-6">
              <span className="font-bold">Select a token</span>
            </Button>
          )}
        </>
      ) : (
        <Button className="rounded-xl text-xl py-6" onClick={() => open()}>
          <span className="font-bold">Connect Walet</span>
        </Button>
      )}
    </>
  );
};

export default SwapTokenButton;
