// @flow

import def from './def.js';

/*::
interface Port {
  postMessage(msg: Object, origin: string): null
}

interface FarRef {
  invoke(method: string, locals: Array<FarRef>, ...args: Array<any>): Promise<any>
}

 */

export default function messageBus(port /*: Port */, label /*: string*/) {
  const byRef /*: Map<string, FarRef> */= new Map();
  const byObject /*: Map<FarRef, string> */ = new Map();
  const pending = new Map(); // sequence number to pending call's promise
  let sequence = 0;

  function attach(ref /*: string*/, obj /*: Object*/) {
    console.log('attach', { label, ref, obj });
    byRef.set(ref, obj);
    byObject.set(obj, ref);
    return obj;
  }

  function fromNear(obj /*: Object*/) {
    console.log('fromNear', label, { obj });

    function invoke(method /*: string*/, locals /*: Array<Object> */, ...args /*: Array<any>*/) {
      console.log('fromNear invoke', label, { obj, method, locals, args });
      return obj[method](locals, ...args);
    }
    return def({ invoke });
  }

  function lookup/*:: <K, V>*/(map /*: Map<K, V>*/, orElse/*: (k: K) => V*/) /*: (K) => V*/{
    return (key) => {
      let val = map.get(key);
      if (typeof val === 'undefined') {
        val = orElse(key);
        map.set(key, val);
      }
      return val;
    };
  }

  function lose(key) {
    throw new TypeError(`not found: ${key.toString()}`);
  }

  function makeProxy(ref /*: string*/) /*: FarRef */ {
    console.log('makeProxy', label, { ref });
    function invoke(method /*: string*/, locals /*: Array<Object>*/, ...args /*: Array<any>*/) {
      const refs = locals.map(lookup(byObject, lose));
      sequence += 1;
      const resultP = new Promise((resolve, reject) => {
        pending.set(sequence, { resolve, reject });
      });
      port.postMessage({ target: ref, method, refs, args, seq: sequence }, '*');
      console.log('makeProxy invoke posted message', label, { target: ref, method, refs, args, seq: sequence });

      return resultP;
    }

    const self = def({ invoke });
    attach(ref, self);
    return self;
  }

  function receive(msg/*: Object*/) {
    const { inReplyTo } = msg;
    if (typeof inReplyTo !== 'undefined') {
      const work = pending.get(inReplyTo);
      if (work) {
        const { resolve, reject } = work;
        if ('result' in msg) {
          resolve(msg.result);
        } else {
          reject(msg.message);
        }
      }
    } else {
      const { target, method, refs, args, seq } = msg;
      const obj = byRef.get(target);
      if (!obj) { return; }
      const locals = refs.map(lookup(byRef, makeProxy));
      obj.invoke(method, locals, ...args)
        .then((result) => {
          port.postMessage({ inReplyTo: seq, result }, '*');
          console.log('receive / invoke / result', label, target);
        })
        .catch((exception) => {
          port.postMessage({ inReplyTo: seq, message: exception.message }, '*');
          console.log('receive / invoke / FAIL', label, target);
        });
    }
  }

  return def({ attach, makeProxy, fromNear, receive });
}
