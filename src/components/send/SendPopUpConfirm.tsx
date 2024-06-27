import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import useWallet from "@/hooks/useWallet";
import {
  ADA_CONTRACT_ADDRESS,
  CONTRACT_ADDRESS,
  LINK_CONTRACT_ADDRESS,
  TON_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
} from "@/config";
import useTokenContract from "@/hooks/useTokenContract";
import { useAppSelector } from "@/redux/store";
import { IToken } from "@/type/token";
import { ToastAction } from "@radix-ui/react-toast";
import { CheckCheck } from "lucide-react";
import { toast } from "../ui/use-toast";
import { parseEther } from "ethers";

type AddressReceiver = {
  receiver: string;
  isAddress: boolean;
};

type PopUpConfirmProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  token: IToken;
  setToken: Dispatch<SetStateAction<IToken>>;
  addressReceiver: AddressReceiver;
  setAddressReceiver: Dispatch<SetStateAction<AddressReceiver>>;
};

export default function SendPopUpConfirm(props: PopUpConfirmProps) {
  const {
    isOpen,
    setIsOpen,
    token,
    setToken,
    addressReceiver,
    setAddressReceiver,
  } = props;
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
    setToken((prev) => ({
      ...prev,
      amount: "",
    }));
    setAddressReceiver((prev) => ({
      ...prev,
      receiver: "",
      isAddress: true,
    }));
  };

  const handleSend = async () => {
    try {
      if (token.address === ADA_CONTRACT_ADDRESS) {
        if (contract && cardanoContract && token.amount && addressReceiver) {
          const amountInAfterFee = (Number(token.amount) * 102) / 100;
          const approveTx = await cardanoContract.approve(
            CONTRACT_ADDRESS,
            parseEther(amountInAfterFee.toString())
          );

          toast({
            title: "Wait",
            className: "bg-accent/50",
            description: "Please wait for transaction !",
          });
          await provider?.waitForTransaction(approveTx.hash);
          const sendTokenTx = await contract.transferToAddress(
            token.address,
            addressReceiver.receiver,
            parseEther(token.amount)
          );
          toast({
            title: "Successful",
            autoFocus: true,
            className: "bg-accent/50",
            description: "Send token successul !",
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
        }
      }

      if (token.address === USDT_CONTRACT_ADDRESS) {
        if (contract && tetherContract && token.amount && addressReceiver) {
          const amountInAfterFee = (Number(token.amount) * 102) / 100;
          const approveTx = await tetherContract.approve(
            CONTRACT_ADDRESS,
            parseEther(amountInAfterFee.toString())
          );
          toast({
            title: "Wait",
            className: "bg-accent/50",
            description: "Please wait for transaction !",
          });
          await provider?.waitForTransaction(approveTx.hash);
          const sendTokenTx = await contract.transferToAddress(
            token.address,
            addressReceiver.receiver,
            parseEther(token.amount)
          );
          toast({
            title: "Successful",
            autoFocus: true,
            className: "bg-accent/50",
            description: "Send token successul !",
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
        }
      }

      if (token.address === TON_CONTRACT_ADDRESS) {
        if (contract && tonContract && token.amount && addressReceiver) {
          const amountInAfterFee = (Number(token.amount) * 102) / 100;
          const approveTx = await tonContract.approve(
            CONTRACT_ADDRESS,
            parseEther(amountInAfterFee.toString())
          );
          toast({
            title: "Wait",
            className: "bg-accent/50",
            description: "Please wait for transaction !",
          });
          await provider?.waitForTransaction(approveTx.hash);
          const sendTokenTx = await contract.transferToAddress(
            token.address,
            addressReceiver.receiver,
            parseEther(token.amount)
          );
          toast({
            title: "Successful",
            autoFocus: true,
            className: "bg-accent/50",
            description: "Send token successul !",
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
        }
      }

      if (token.address === LINK_CONTRACT_ADDRESS) {
        if (contract && linkContract && token.amount && addressReceiver) {
          const amountInAfterFee = (Number(token.amount) * 102) / 100;
          const approveTx = await linkContract.approve(
            CONTRACT_ADDRESS,
            parseEther(amountInAfterFee.toString())
          );
          toast({
            title: "Wait",
            className: "bg-accent/50",
            description: "Please wait for transaction !",
          });
          await provider?.waitForTransaction(approveTx.hash);
          const sendTokenTx = await contract.transferToAddress(
            token.address,
            addressReceiver.receiver,
            parseEther(token.amount)
          );
          toast({
            title: "Successful",
            autoFocus: true,
            className: "bg-accent/50",
            description: "Send token successul !",
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
    <div
      className={`absolute z-100 bg-primary/30 w-screen h-screen top-0 left-0 transition-fade ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={() => setIsOpen(false)}
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="bg-primary-foreground w-[400px] h-[200px] rounded-xl shadow-lg py-4 px-8">
          <h3 className="text-xl font-bold mb-4">Confirm payment</h3>
          <span>Are you sure to confirm payment?</span>
          <div className="flex items-center justify-end py-6">
            <Button onClick={() => handleSend()}>Confirm</Button>
            <Button
              variant={"outline"}
              className="ml-6"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
