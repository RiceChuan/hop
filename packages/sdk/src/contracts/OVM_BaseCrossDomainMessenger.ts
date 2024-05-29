/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common.js";

export interface OVM_BaseCrossDomainMessengerInterface extends utils.Interface {
  functions: {
    "messageNonce()": FunctionFragment;
    "relayedMessages(bytes32)": FunctionFragment;
    "sentMessages(bytes32)": FunctionFragment;
    "successfulMessages(bytes32)": FunctionFragment;
    "xDomainMessageSender()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "messageNonce"
      | "relayedMessages"
      | "sentMessages"
      | "successfulMessages"
      | "xDomainMessageSender"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "messageNonce",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "relayedMessages",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "sentMessages",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "successfulMessages",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "xDomainMessageSender",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "messageNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "relayedMessages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sentMessages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "successfulMessages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "xDomainMessageSender",
    data: BytesLike
  ): Result;

  events: {};
}

export interface OVM_BaseCrossDomainMessenger extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OVM_BaseCrossDomainMessengerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    messageNonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    relayedMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    sentMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    successfulMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    xDomainMessageSender(overrides?: CallOverrides): Promise<[string]>;
  };

  messageNonce(overrides?: CallOverrides): Promise<BigNumber>;

  relayedMessages(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  sentMessages(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  successfulMessages(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  xDomainMessageSender(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    messageNonce(overrides?: CallOverrides): Promise<BigNumber>;

    relayedMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    sentMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    successfulMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    xDomainMessageSender(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    messageNonce(overrides?: CallOverrides): Promise<BigNumber>;

    relayedMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sentMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    successfulMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    xDomainMessageSender(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    messageNonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    relayedMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sentMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    successfulMessages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    xDomainMessageSender(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}