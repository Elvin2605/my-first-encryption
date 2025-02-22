// lib/cryptoUtils.js

export const generateKeyPair = async () => {
    try {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: 4096,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
      );
      return keyPair;
    } catch (error) {
      console.error('Error generating key pair:', error);
      throw error;
    }
  };
  
  export const exportPublicKey = async (keyPair : CryptoKeyPair) => {
    try {
      const exported = await crypto.subtle.exportKey('spki', keyPair.publicKey);
      const exportedAsBase64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
      const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
      return pemExported;
    } catch (error) {
      console.error('Error exporting public key:', error);
      throw error;
    }
  };
  
  export const exportPrivateKey = async (keyPair : CryptoKeyPair) => {
    try {
      const exported = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
      const exportedAsBase64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
      const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
      return pemExported;
    } catch (error) {
      console.error('Error exporting private key:', error);
      throw error;
    }
  };