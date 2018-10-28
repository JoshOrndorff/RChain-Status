// @flow

import { Par } from './lib/RhoTypes.js';

/**
 * "we can detail a direct representation of JSON into a
 * fragment of the rholang syntax referred to in the diagram
 * below as RHOCore." -- [Mobile process calculi for programming the blockchain[1]
 *
 * [1]: https://github.com/rchain/mobile-process-calculi-for-blockchain/blob/master/enter-the-blockchain.rst
 * @param x Any javascript object to be serialized to RHOCore
 * @return A rholang term representing the object in RHOCore form.
 */
export function fromJSData(data /*: any */) {
  const expr1 = kv => ({ exprs: [kv] });

  function recur(x) /*: Par*/ {
    switch (typeof x) {
      case 'boolean':
        return expr1({ g_bool: x, expr_instance: 'g_bool' });
      case 'number':
        // ISSUE: only integers
        return expr1({ g_int: x, expr_instance: 'g_int' });
      case 'string':
        return expr1({ g_string: x, expr_instance: 'g_string' });
      case 'object':
        if (x === null) {
          return {};
        }
        if (Array.isArray(x)) {
          return toArry(x);
        }
        return keysValues(x);
      default:
        throw new Error(`no mapping to RHOCore for ${typeof x}`);
    }
  }

  function toArry(items) {
    // [1, 2, 2] is a process with one exprs, which is a list
    // The list has one 3 items, each of which is a process
    // with one exprs, which is an int.
    return expr1({
      e_list_body: { ps: items.map(recur) },
      expr_instance: 'e_list_body',
    });
  }

  function keysValues(obj) {
    const sends = Object.keys(obj).sort().map((k) => {
      const chan = { quote: expr1({ g_string: k, expr_instance: 'g_string' }) };
      return { chan, data: [recur(obj[k])] };
    });
    return { sends };
  }

  return recur(data);
}


/**
 * Turns a rholang term into a byte-array compatible with Rholang
 * @param termObj a rholang term object
 * @return The byte-array
 */
export function toByteArray(termObj /*: Par */) {
  // Par.verify(termObj);
  return Par.encode(termObj).finish();
}


/**
 * Converts an RHOCore object into Rholang source form
 *
 * @param par A RHOCore representation of a Rholang term
 * @return A rholang string
 */
export function toRholang(par /*: Par */) {
  const src = x => JSON.stringify(x);

  function recur(p) {
    if (p.exprs && p.exprs.length > 0) {
      if (p.exprs.length > 1) {
        throw new Error(`${p.exprs.length} exprs not part of RHOCore`);
      }
      const ex = p.exprs[0];
      if (ex.expr_instance === 'g_bool') {
        return src(ex.g_bool);
      }
      if (ex.expr_instance === 'g_int') {
        return src(ex.g_int);
      }
      if (ex.expr_instance === 'g_string') {
        return src(ex.g_string);
      }
      if (ex.expr_instance === 'e_list_body') {
        const items = ex.e_list_body.ps.map(recur).join(', ');
        return `[${items}]`;
      }
      throw new Error(`not RHOCore? ${ex}`);
    } else if (p.sends) {
      const ea = s => `@${recur(s.chan.quote)}!(${s.data.map(recur).join(', ')})`;
      return p.sends.map(ea).join(' | ');
    } else {
      // TODO: check that everything else is empty
      return 'Nil';
    }
  }

  return recur(par);
}
