export abstract class DataStore<T, U> {
  // Events
  abstract on(event: string, listener: (...args: any[]) => void): void

  // Init
  abstract init (): Promise<void>
  abstract start (): void

  // TODO: Diff U
  // Getters
  abstract fetchItem(primaryIndex: T, secondaryIndex: U): Promise<U | undefined>
}
