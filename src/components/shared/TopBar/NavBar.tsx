import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center justify-center">
        <li className="px-3 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/"}>Swap</Link></li>
        <li className="px-3 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/explore"}>Explore</Link></li>
        <li className="px-3 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/buy"}>Buy</Link></li>
        <li className="px-3 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/send"}>Send</Link></li>
        <li className="px-3 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/vote"}>Vote</Link></li>
      </ul>
    </nav>
  );
}
