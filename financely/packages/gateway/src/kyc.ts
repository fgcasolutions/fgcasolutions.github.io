import fetch from 'node-fetch';

export async function verifyWithTrulioo(data: any) {
  // TODO: call Trulioo API
  await fetch('https://api.trulioo.com/verify', { method: 'POST', body: JSON.stringify(data) });
}

export async function verifyWithOnfido(data: any) {
  // TODO: call Onfido API
  await fetch('https://api.onfido.com/verify', { method: 'POST', body: JSON.stringify(data) });
}
