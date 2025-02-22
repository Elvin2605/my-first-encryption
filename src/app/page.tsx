'use client';

// app/page.tsx

import CryptoExample from './components/CryptoExample';
import PGPExample from './components/PGPexample';
import { useState } from 'react';

export default function Home() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  return (
    <div>
      <h1 className='text-3xl font-bold flex justify-center items-center'>KeyedIn</h1>
      <CryptoExample
        onKeysGenerated={(publicKey, privateKey) => {
          setPublicKey(publicKey);
          setPrivateKey(privateKey);
        }}
      />
      {publicKey && privateKey && (
        <PGPExample publicKey={publicKey} privateKey={privateKey} />
      )}
    </div>
  );
}
