/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IStateReceiver,
  IStateReceiverInterface,
} from "../IStateReceiver.js";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "stateId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onStateReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IStateReceiver__factory {
  static readonly abi = _abi;
  static createInterface(): IStateReceiverInterface {
    return new utils.Interface(_abi) as IStateReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IStateReceiver {
    return new Contract(address, _abi, signerOrProvider) as IStateReceiver;
  }
}
