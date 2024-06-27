import { ethers } from "ethers";

export type TokenContract = {
  cardanoContract: ethers.Contract;
  tetherContract: ethers.Contract;
  tonContract: ethers.Contract;
  linkContract: ethers.Contract;
};
