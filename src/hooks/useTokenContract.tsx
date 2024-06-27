import { useEffect, useState } from "react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, ethers } from "ethers";
import Cardano from "../../contracts/Cardano.json";
import Tether from "../../contracts/Tether.json";
import Ton from "../../contracts/Ton.json";
import Link from "../../contracts/Link.json";
import { TokenContract } from "@/type/tokenContract";



const useTokenContract = (): TokenContract | undefined => {
  const { walletProvider } = useWeb3ModalProvider();
  const [tokenContract, setTokenContract] = useState<{
    cardanoContract: ethers.Contract;
    tetherContract: ethers.Contract;
    tonContract: ethers.Contract;
    linkContract: ethers.Contract;
  }>();
  useEffect(() => {
    const fetchWallet = async () => {
      if (walletProvider) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const cardanoContract = new ethers.Contract(
          "0x868C1bf25f05f7245A92A5BEd9819B027D542B07",
          Cardano.abi,
          signer
        );
        const tetherContract = new ethers.Contract(
          "0x84Daf9Fe3bBd3A1DC63B8E864d0c4a2f0C3aD9Ff",
          Tether.abi,
          signer
        );
        const linkContract = new ethers.Contract(
          "0x8855d936F63D3e101Ed18853Fee710B9B33037fD",
          Link.abi,
          signer
        );
        const tonContract = new ethers.Contract(
          "0x157C0F00b7fF86C144036e72cDb345022E5B2215",
          Ton.abi,
          signer
        );

        setTokenContract({
          cardanoContract,
          tetherContract,
          tonContract,
          linkContract,
        });
      }
    };
    fetchWallet();
  }, [walletProvider]);
  return tokenContract;
};

export default useTokenContract;
