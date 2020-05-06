import CryptoJS from 'crypto-js';

export const decrypt = (encrypted, secret) => {
  const bytes = CryptoJS.AES.decrypt(encrypted.toString(), secret);
  if (bytes) {
    return bytes.toString(CryptoJS.enc.Utf8);
  } else {
    return false;
  }
};
