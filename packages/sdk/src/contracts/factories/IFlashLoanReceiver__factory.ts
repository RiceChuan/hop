/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IFlashLoanReceiver,
  IFlashLoanReceiverInterface,
} from "../IFlashLoanReceiver.js";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "executeOperation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IFlashLoanReceiver__factory {
  static readonly abi = _abi;
  static createInterface(): IFlashLoanReceiverInterface {
    return new utils.Interface(_abi) as IFlashLoanReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFlashLoanReceiver {
    return new Contract(address, _abi, signerOrProvider) as IFlashLoanReceiver;
  }
}
