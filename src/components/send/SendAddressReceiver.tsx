import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useEffect } from "react";

type AddressReceiver = {
  receiver: string;
  isAddress: boolean;
};

type SendAddressReceiverProps = {
  addressReceiver: AddressReceiver;
  setAddressReceiver: Dispatch<SetStateAction<AddressReceiver>>;
};

export default function SendAddressReceiver(props: SendAddressReceiverProps) {
  const { addressReceiver, setAddressReceiver } = props;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddressReceiver((prev) => ({
      ...prev,
      receiver: value,
      isAddress: false,
    }));
  };

  useEffect(() => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (regex.test(addressReceiver.receiver)) {
      setAddressReceiver((prev) => ({
        ...prev,
        isAddress: true,
      }));
    }
  }, [addressReceiver.receiver, setAddressReceiver]);

  return (
    <div className="flex flex-col justify-center py-4 bg-accent rounded-2xl px-6">
      <span className="text-sm">To</span>
      <div className="flex justify-between items-center ">
        <Input
          className="focus-visible:ring-transparent px-0 border-0 focus-visible:ring-offset-0 bg-transparent text-base"
          placeholder="Wallet address or ENS name"
          value={addressReceiver.receiver}
          onChange={handleChangeInput}
        />
        <button
          onClick={() =>
            setAddressReceiver((prev) => ({
              ...prev,
              receiver: "",
              isAddress: false,
            }))
          }
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <span
        className={`text-sm text-center text-destructive ${
          addressReceiver.isAddress ? "opacity-0" : "opacity-1"
        }`}
      >
        The input must be in the form of address
      </span>
    </div>
  );
}
