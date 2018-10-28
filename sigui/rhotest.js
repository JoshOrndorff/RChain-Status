import { fromJSData, toByteArray, toRholang } from './RHOCore.js';

window.fromJSData = fromJSData;

export function run() {
  const data = "Bob";
  const par = fromJSData(data);
  const bs = toByteArray(par);
  const rho = toRholang(par);
  console.log('rhotest:', { data, par, bs, rho });
  return { data, par, bs, rho };
}
