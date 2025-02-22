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

  const handleEncrypt = async () => {
    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: message }),
      encryptionKeys: await openpgp.readKey({ armoredKey: publicKey }),
    });
    setEncryptedMessage(encrypted);
  };

  const handleDecrypt = async () => {
    const decrypted = await openpgp.decrypt({
      message: await openpgp.readMessage({ armoredMessage: encryptedMessage }),
      decryptionKeys: await openpgp.readPrivateKey({ armoredKey: privateKey }),
    });
    setDecryptedMessage(decrypted.data);
  };

  return (
    <div>
      <h2>PGP Encryption/Decryption</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message to encrypt"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <div>
        <h3>Encrypted Message</h3>
        <pre>{encryptedMessage}</pre>
      </div>
      <button className='border-2' onClick={handleDecrypt}>Decrypt</button>
      <div>
        <h3>Decrypted Message</h3>
        <pre>{decryptedMessage}</pre>
      </div>
    </div>
  );
}