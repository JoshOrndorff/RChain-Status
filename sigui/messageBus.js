/** messageBus - message passing data structures
 */
// @flow

/*::
export interface BusPort {
  postMessage(msg: BusMessage | BusReply): void,
  listen(cb: (BusMessage | BusReply) => boolean): void
}

export interface FarRef {
  invoke(method: string, locals: Array<FarRef>, ...args: Array<any>): Promise<any>
}

export interface FarRef2 {
  invokeRef(method: string, refs: Array<string>, ...args: Array<any>): Promise<any>
}

export type BusMessage = {
  kind: 'invoke',
  target: string,
  method: string,
  refs: Array<string>,
  args: Array<mixed>,
  seq?: number
}

export type SuccessReply = {
  kind: 'success',
  result: mixed,
}

export type FailureReply = {
  kind: 'failure',
  message: string
}

export type BusReply = SuccessReply | FailureReply;

export interface BusTarget {
  receive(msg: BusMessage): boolean
}

export interface BusDelayedTarget {
  receive(msg: BusMessage, cb: (BusReply) => void): boolean | void
}

type PendingWork = {
  resolve: (v: any) => void,
  reject: (messge: string) => void
}
 */

export default function messageBus(_port /*: BusPort */, _label /*: string*/) {
  throw new TypeError('not implemented');
}
