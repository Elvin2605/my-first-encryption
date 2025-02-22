// components/PGPExample.tsx
'use client'
import { useState } from 'react';
import * as openpgp from 'openpgp';

interface PGPExampleProps {
  publicKey: string;
  privateKey: string;
}

export default function PGPExample({ publicKey, privateKey }: PGPExampleProps) {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEncrypt = async () => {
    try {
      setError(null);
      if (!message) {
        throw new Error('Please enter a message to encrypt');
      }

      // Create message object
      const messageObj = await openpgp.createMessage({ text: message });
      
      // Read the public key
      const publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });
      
      // Encrypt the message
      const encrypted = await openpgp.encrypt({
        message: messageObj,
        encryptionKeys: publicKeyObj
      });

      setEncryptedMessage(encrypted as string);
    } catch (err: any) {
      console.error('Encryption error:', err);
      setError(err.message || 'Error encrypting message');
    }
  };

  const handleDecrypt = async () => {
    try {
      setError(null);
      if (!encryptedMessage) {
        throw new Error('No encrypted message to decrypt');
      }

      // Read the private key
      const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: privateKey });
      
      // Read the encrypted message
      const encryptedMessageObj = await openpgp.readMessage({
        armoredMessage: encryptedMessage
      });
      
      // Decrypt the message
      const { data: decrypted } = await openpgp.decrypt({
        message: encryptedMessageObj,
        decryptionKeys: privateKeyObj
      });

      setDecryptedMessage(decrypted as string);
    } catch (err: any) {
      console.error('Decryption error:', err);
      setError(err.message || 'Error decrypting message');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">PGP Encryption/Decryption</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            className="w-full bg-black p-2 border rounded focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message to encrypt"
            rows={4}
          />
        </div>

        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleEncrypt}
        >
          Encrypt
        </button>

        {encryptedMessage && (
          <div>
            <h3 className="font-semibold mb-2">Encrypted Message:</h3>
            <pre className="p-2 bg-black rounded overflow-auto text-sm">
              {encryptedMessage}
            </pre>
          </div>
        )}

        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleDecrypt}
          disabled={!encryptedMessage}
        >
          Decrypt
        </button>

        {decryptedMessage && (
          <div>
            <h3 className="font-semibold mb-2">Decrypted Message:</h3>
            <pre className="p-2 bg-black rounded overflow-auto text-sm">
              {decryptedMessage}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}