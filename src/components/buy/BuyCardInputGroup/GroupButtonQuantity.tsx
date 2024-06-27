import { Button } from "@/components/ui/button";
import { IToken } from "@/type/token";
import { Dispatch, SetStateAction } from "react";

export default function GroupButtonQuantity(props: {
  setToken: Dispatch<SetStateAction<IToken>>;
}) {
  const { setToken } = props;
  return (
    <div className="flex items-center justify-between">
      <Button
        className="py-1 px-4 w-[76px] text-center  rounded-2xl bg-accent hover:shadow-md hover:bg-accent"
        onClick={() => setToken((prev) => ({ ...prev, amount: "200" }))}
      >
        <span className="text-primary text-lg font-semibold">200</span>
      </Button>
      <Button
        className="py-1 px-4 w-[76px] text-center  rounded-2xl bg-accent hover:shadow-md hover:bg-accent"
        onClick={() => setToken((prev) => ({ ...prev, amount: "300" }))}
      >
        <span className="text-primary text-lg font-semibold">300</span>
      </Button>
      <Button
        className="py-1 px-4 w-[76px] text-center  rounded-2xl bg-accent hover:shadow-md hover:bg-accent"
        onClick={() => setToken((prev) => ({ ...prev, amount: "500" }))}
      >
        <span className="text-primary text-lg font-semibold">500</span>
      </Button>
      <Button
        className="py-1 px-4 w-[76px] text-center  rounded-2xl bg-accent hover:shadow-md hover:bg-accent"
        onClick={() => setToken((prev) => ({ ...prev, amount: "1000" }))}
      >
        <span className="text-primary text-lg font-semibold">1000</span>
      </Button>
    </div>
  );
}
