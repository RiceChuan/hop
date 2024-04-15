/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common.js";

export interface IOVM_BaseCrossDomainMessengerInterface
  extends utils.Interface {
  functions: {
    "deposit(address,uint256,bool)": FunctionFragment;
    "sendMessage(address,bytes,uint32)": FunctionFragment;
    "xDomainMessageSender()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "deposit" | "sendMessage" | "xDomainMessageSender"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deposit",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "sendMessage",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "xDomainMessageSender",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sendMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "xDomainMessageSender",
    data: BytesLike
  ): Result;

  events: {
    "RelayedMessage(bytes32)": EventFragment;
    "SentMessage(bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RelayedMessage"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SentMessage"): EventFragment;
}

export interface RelayedMessageEventObject {
  msgHash: string;
}
export type RelayedMessageEvent = TypedEvent<
  [string],
  RelayedMessageEventObject
>;

export type RelayedMessageEventFilter = TypedEventFilter<RelayedMessageEvent>;

export interface SentMessageEventObject {
  message: string;
}
export type SentMessageEvent = TypedEvent<[string], SentMessageEventObject>;

export type SentMessageEventFilter = TypedEventFilter<SentMessageEvent>;

export interface IOVM_BaseCrossDomainMessenger extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IOVM_BaseCrossDomainMessengerInterface;

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
    deposit(
      _depositor: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _send: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sendMessage(
      _target: PromiseOrValue<string>,
      _message: PromiseOrValue<BytesLike>,
      _gasLimit: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    xDomainMessageSender(overrides?: CallOverrides): Promise<[string]>;
  };

  deposit(
    _depositor: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _send: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sendMessage(
    _target: PromiseOrValue<string>,
    _message: PromiseOrValue<BytesLike>,
    _gasLimit: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  xDomainMessageSender(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    deposit(
      _depositor: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _send: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    sendMessage(
      _target: PromiseOrValue<string>,
      _message: PromiseOrValue<BytesLike>,
      _gasLimit: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    xDomainMessageSender(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "RelayedMessage(bytes32)"(msgHash?: null): RelayedMessageEventFilter;
    RelayedMessage(msgHash?: null): RelayedMessageEventFilter;

    "SentMessage(bytes)"(message?: null): SentMessageEventFilter;
    SentMessage(message?: null): SentMessageEventFilter;
  };

  estimateGas: {
    deposit(
      _depositor: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _send: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sendMessage(
      _target: PromiseOrValue<string>,
      _message: PromiseOrValue<BytesLike>,
      _gasLimit: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    xDomainMessageSender(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      _depositor: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _send: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sendMessage(
      _target: PromiseOrValue<string>,
      _message: PromiseOrValue<BytesLike>,
      _gasLimit: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    xDomainMessageSender(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
