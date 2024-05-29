/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  OVM_BaseCrossDomainMessenger,
  OVM_BaseCrossDomainMessengerInterface,
} from "../OVM_BaseCrossDomainMessenger.js";

const _abi = [
  {
    inputs: [],
    name: "messageNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "relayedMessages",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "sentMessages",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "successfulMessages",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "xDomainMessageSender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class OVM_BaseCrossDomainMessenger__factory {
  static readonly abi = _abi;
  static createInterface(): OVM_BaseCrossDomainMessengerInterface {
    return new utils.Interface(_abi) as OVM_BaseCrossDomainMessengerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OVM_BaseCrossDomainMessenger {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OVM_BaseCrossDomainMessenger;
  }
}