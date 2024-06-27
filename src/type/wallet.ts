import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";

export interface IWallet {
  address: string | null;
  network: ethers.Network | null;
  signer: JsonRpcSigner | undefined;
  contract: ethers.Contract | undefined;
  ethersProvider: BrowserProvider | undefined;
}
