// components/CryptoExample.tsx
'use client'
import { useState } from 'react';
import { generateKeyPair, exportPublicKey, exportPrivateKey } from '../../../lib/cryptoUtils';

interface CryptoExampleProps {
  onKeysGenerated: (publicKey: string, privateKey: string) => void;
}

export default function CryptoExample({ onKeysGenerated }: CryptoExampleProps) {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleGenerateKeys = async () => {
    const keyPair = await generateKeyPair();
    const publicKeyPem = await exportPublicKey(keyPair);
    const privateKeyPem = await exportPrivateKey(keyPair);

    setPublicKey(publicKeyPem);
    setPrivateKey(privateKeyPem);
    onKeysGenerated(publicKeyPem, privateKeyPem);
    console.log(publicKey,privateKey);
  };

  return (
    <div>
      <h2>Generate Keys</h2>
      <button className='border-2' onClick={handleGenerateKeys}>Generate Key Pair</button>
      <div>
        <h3>Public Key</h3>
        <pre>{publicKey}</pre>
      </div>
      <div>
        <h3>Private Key</h3>
        <pre>{privateKey}</pre>
      </div>
    </div>
  );
}