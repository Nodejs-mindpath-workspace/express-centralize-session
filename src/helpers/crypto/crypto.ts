import crypto from 'crypto';

import dotEnv from '../../constants/dotEnv';
import logger from '../../swaggers/helpers/logger';

export default class CryptoHelper {
    public encrypt<T>(data: T): string {
        const buffer = Buffer.from(JSON.stringify(data), "utf8");
        const encrypted = crypto.privateEncrypt(
            {
                key: dotEnv.PRIVATE_KEY,
                passphrase: dotEnv.PASSPHRASE,
            },
            buffer
        );
        return (encrypted.toString('base64'));
    }

    public decrypt<T>(data: string): T | string {
        const buffer = Buffer.from(data, "base64");
        const decrypted = crypto.privateDecrypt(
            {
                key: dotEnv.PRIVATE_KEY,
                passphrase: dotEnv.PASSPHRASE,
            },
            buffer
        );

        /**
         * @description - Parsing the decrypted content if its parsable otherwise return the decrypted string;
         */
        try {
            return JSON.parse(decrypted.toString('utf8'));
        } catch (error) {
            logger.error(error);
            return decrypted.toString('utf8');
        }
    }

    public publicDecrypt<T>(data: string): T {
        const buffer = Buffer.from(data, "base64");
        const decrypted = crypto.publicDecrypt(
            dotEnv.PUBLIC_ENCRYPTION_KEY,
            buffer
        );
        return JSON.parse(decrypted.toString('utf8'));
    }

    public publicEncrypt<T>(data: T): string {
        const buffer = Buffer.from(JSON.stringify(data));
        const encrypted = crypto.publicEncrypt(dotEnv.PUBLIC_ENCRYPTION_KEY || '', buffer);
        return encrypted.toString('base64');
    }
}
