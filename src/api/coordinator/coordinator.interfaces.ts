export interface CoordinatorTransport<M = unknown, R = unknown> {
  send(message: M): R;
}
