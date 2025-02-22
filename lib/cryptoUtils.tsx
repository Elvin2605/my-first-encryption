// lib/cryptoUtils.tsx
import * as openpgp from 'openpgp';

export const generateKeyPair = async () => {
    try {
        const { privateKey, publicKey } = await openpgp.generateKey({
            type: 'rsa',
            rsaBits: 4096,
            userIDs: [{ name: 'Test User', email: 'test@example.com' }],
            format: 'armored'
        });

        return {
            publicKey,
            privateKey
        };
    } catch (error) {
        console.error('Error generating key pair:', error);
        throw error;
    }
};