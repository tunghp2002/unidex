import { Search } from "lucide-react";
import { Input } from "../../ui/input";

const SearchToken = () => {
  return (
    <div className="relative flex items-center md:w-[500px] m-w-[320px]">
      <Input
        type="text"
        placeholder="Search tokens and NFT collections"
        className="pl-10 rounded-xl hover:border-accent-foreground focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-accent-foreground"
      />
      <Search className="absolute left-2 text-accent-foreground h-[1.2rem] w-[1.2rem] " />
    </div>
  );
};

export default SearchToken;
