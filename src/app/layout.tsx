import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import TopBar from "@/components/shared/TopBar";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Web3Modal } from "@/context/web3modal";
import BottomBar from "@/components/shared/BottomBar.tsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uniswap Dapp",
  description: "Uniswap clone Dapp project Tc-X23-Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} relative`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Web3Modal>
              <TopBar />
              <main>{children}</main>
              <Toaster/>
              <BottomBar/>
            </Web3Modal>
          </ThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
