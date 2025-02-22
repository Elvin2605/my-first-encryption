// pages/api/crypto.tsx

import { generateKeyPair, exportPublicKey, exportPrivateKey } from '../../../lib/cryptoUtils';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  publicKey?: string;
  privateKey?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      const keyPair = await generateKeyPair();
      const publicKey = await exportPublicKey(keyPair);
      const privateKey = await exportPrivateKey(keyPair);

      res.status(200).json({ publicKey, privateKey });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate keys' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}