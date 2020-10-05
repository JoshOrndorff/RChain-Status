// @ts-check

import { RhoExpr } from 'rchain-api';

const { freeze } = Object;

export const Rho = freeze({
  checkBalance: (/** @type { string } */ addr) => `
  new return, rl(\`rho:registry:lookup\`), RevVaultCh, vaultCh in {
    rl!(\`rho:rchain:revVault\`, *RevVaultCh) |
    for (@(_, RevVault) <- RevVaultCh) {
      @RevVault!("findOrCreate", ${JSON.stringify(addr)}, *vaultCh) |
      for (@maybeVault <- vaultCh) {
        match maybeVault {
          (true, vault) => @vault!("balance", *return)
          (false, err)  => return!(err)
        }
      }
    }
  }`,
});

/**
 * @param { Observer } observer
 * @param { string } address
 * @returns { Promise<number> }
 *
 * @typedef { import('rchain-api').Observer } Observer
 */
export async function checkBalance(observer, address) {
  const term = Rho.checkBalance(address);
  const {
    expr: [expr],
  } = await observer.exploratoryDeploy(term);
  const balance = RhoExpr.parse(expr);
  if (typeof balance !== 'number') {
    throw new TypeError(`expected number; got ${typeof balance}: ${balance}`);
  }
  return balance;
}
