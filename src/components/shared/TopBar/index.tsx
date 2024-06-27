import ConnectButton from "./ConnectWallet";
import Logo from "./Logo";
import NavBar from "./NavBar";
import SearchToken from "./SearchToken";

export default function TopBar () {
  return <header className="flex items-center justify-between px-3 py-5">
    <div className="flex items-center justify-between">
      <Logo/>
      <NavBar/>
    </div>
    <SearchToken/>
    <ConnectButton/>
  </header>
}