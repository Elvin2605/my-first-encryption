// pages/api/crypto.tsx

import { generateKeyPair } from '../../../lib/cryptoUtils';
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
      const { publicKey, privateKey } = await generateKeyPair();
      res.status(200).json({ publicKey, privateKey });
    } catch (error: any) {
      console.error('Error generating keys:', error);
      res.status(500).json({ error: error.message || 'Failed to generate keys' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}