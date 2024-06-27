import { useEffect, useState } from "react";

const useDebounce = (searchValue: string | undefined, delay: number) => {
  const [debaounceValue, setdebaounceValue] = useState<string>("0");
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue === undefined) {
        setdebaounceValue("0");
      } else {
        setdebaounceValue(searchValue);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, delay]);
  return debaounceValue;
};

export default useDebounce;
