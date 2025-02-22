// components/CryptoExample.tsx
'use client'
import { useState } from 'react';
import { generateKeyPair } from '../../../lib/cryptoUtils';

interface CryptoExampleProps {
  onKeysGenerated: (publicKey: string, privateKey: string) => void;
}

export default function CryptoExample({ onKeysGenerated }: CryptoExampleProps) {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateKeys = async () => {
    try {
      setError(null);
      const { publicKey: pubKey, privateKey: privKey } = await generateKeyPair();
      
      setPublicKey(pubKey);
      setPrivateKey(privKey);
      onKeysGenerated(pubKey, privKey);
      
      console.log('Public Key:', pubKey);
      console.log('Private Key:', privKey);
    } catch (err: any) {
      console.error('Error generating keys:', err);
      setError(err.message || 'Error generating key pair');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Generate Keys</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        onClick={handleGenerateKeys}
      >
        Generate Key Pair
      </button>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Public Key</h3>
          <pre className="p-2 bg-black rounded overflow-auto text-sm">
            {publicKey || 'No public key generated yet'}
          </pre>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Private Key</h3>
          <pre className="p-2 bg-black rounded overflow-auto text-sm">
            {privateKey || 'No private key generated yet'}
          </pre>
        </div>
      </div>
    </div>
  );
}