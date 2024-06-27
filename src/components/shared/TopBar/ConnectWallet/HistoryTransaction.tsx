import { useEffect, useState } from "react";
import axios from "axios";
import { IResult, ITransaction } from "@/type/response";
import { LoaderCircle } from "lucide-react";

const HistoryTransaction = (props: { address: string }) => {
  const { address } = props;
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchHistoryTransaction = async () => {
      try {
        const response = await axios.get(
          `https://demo2.thietkewebsite.live/api/v1/transaction/${address}`
        );
        const data: IResult<ITransaction> = await response.data;
        setTransactions(data.result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchHistoryTransaction();
  }, [address]);
  return (
    <div className="pt-4">
      <h3 className="pb-2">History Transaction</h3>
      {isLoading ? (
        <div className="flex items-center justify-center h-[340px] border-2 rounded-xl">
          <span className="pr-1">Loading </span>
          <LoaderCircle className="rotating-infinite" />
        </div>
      ) : (
        <ul className="p-2 border-2 border-border rounded-xl bg-accent/20 max-h-[360px] overflow-y-auto shadow scrollbar-thin">
          {transactions.map((transaction) => {
            return (
              <li
                className="p-2 rounded-lg hover:bg-accent transition-all"
                key={transaction.transactionHash}
              >
                <div className="flex items-center justify-between font-semibold">
                  <div>
                    {(transaction.method === "0x60806040" &&
                      "Contract Creation") ||
                      (transaction.method === "0x37476ced" && "Swap Token") ||
                      (transaction.method === "0x8b85d09d" && "Buy Token") ||
                      transaction.method}
                  </div>
                  <div>{transaction.value}</div>
                </div>
                <div className="flex items-center justify-between font-light text-sm pt-2">
                  <div className="italic pl-1 text-green-300">
                    {transaction.age}
                  </div>
                  <div>{transaction.fee}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HistoryTransaction;
