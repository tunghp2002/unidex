"use client";
import { useEffect, useState } from "react";
import { createWeb3Modal, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { IWallet } from "@/type/wallet";
import { BrowserProvider, parseEther, ethers } from "ethers";
import Tether from "../../../contracts/Tether.json";
import Cardano from "../../../contracts/Cardano.json";
import Ton from "../../../contracts/Ton.json";
import Link from "../../../contracts/Link.json";

import { Button } from "../ui/button";
import { TokenContract } from "@/type/tokenContract";
import { CONTRACT_ADDRESS } from "@/config";

const SendTestPage = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const [contract, setContract] = useState<TokenContract>();
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
        setContract({
          cardanoContract,
          tetherContract,
          tonContract,
          linkContract,
        });
      }
    };
    fetchWallet();
  }, [walletProvider]);

  const handleMint = async () => {
    if (contract?.cardanoContract) {
      const amount = parseEther("100000");
      await contract.cardanoContract.mint(CONTRACT_ADDRESS, amount);
      alert("ok");
    }
    if (contract?.tetherContract) {
      const amount = parseEther("100000");
      await contract.tetherContract.mint(CONTRACT_ADDRESS, amount);
      alert("ok");
    }
    if (contract?.tonContract) {
      const amount = parseEther("100000");
      await contract.tonContract.mint(CONTRACT_ADDRESS, amount);
      alert("ok");
    }
    if (contract?.linkContract) {
      const amount = parseEther("100000");
      await contract.linkContract.mint(CONTRACT_ADDRESS, amount);
      alert("ok");
    }
  };

  const handleBalance = async () => {
    // if(wallet?.contract){
    //   const balanceBigInt = await wallet.contract.balanceOf(CONTRACT_ADDRESS);
    //   console.log(ethers.formatEther(balanceBigInt));
    // }
  };

  return (
    <div className="flex items-center justify-center">
      <Button onClick={handleMint}>Mint</Button>
      <Button onClick={handleBalance}>Balance</Button>
    </div>
  );
};

export default SendTestPage;
