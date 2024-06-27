import Link from "next/link";

export default function BottomBar () {
  return (
    <footer className="fixed bottom-0 z-10 w-full rounded-t-3xl xs:px-7 lg:hidden">
      <nav className="flex items-center justify-center gap-3 xs:gap-5">
      <ul className="flex items-center justify-center border-spacing-1 border-2 rounded-2xl p-1">
        <li className="px-5 md:px-12 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/"}>Swap</Link></li>
        <li className="px-5 md:px-12 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/explore"}>Explore</Link></li>
        <li className="px-5 md:px-12 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/buy"}>Buy</Link></li>
        <li className="px-5 md:px-12 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/send"}>Send</Link></li>
        <li className="px-5 md:px-12 py-2 text-primary rounded-xl hover:bg-accent transition-colors"><Link href={"/vote"}>Vote</Link></li>
      </ul>
    </nav>
    </footer>
  )
}