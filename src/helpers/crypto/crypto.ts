import crypto from "crypto";

import dotEnv from "../../constants/dotEnv";
import logger from "../../swaggers/helpers/logger";
import { CryptoEncryptedDataResponse, CryptoEncryptedMetaData } from "../../types/crypto/crypto";

export default class CryptoHelper {
    private _publicDecryptAESKey(encryptedKey: string) {
        return crypto.publicDecrypt(dotEnv.PUBLIC_ENCRYPTION_KEY!, Buffer.from(encryptedKey, "base64"));
    }

    private _decryptAESKey(encryptedKey: string) {
        return crypto.privateDecrypt(
            {
                key: dotEnv.PRIVATE_KEY!,
                passphrase: dotEnv.PASSPHRASE,
            },
            Buffer.from(encryptedKey, "base64"),
        );
    }

    public encrypt<T>(data: T): string {
        const buffer = Buffer.from(JSON.stringify(data), "utf8");
        const encrypted = crypto.privateEncrypt(
            {
                key: dotEnv.PRIVATE_KEY!,
                passphrase: dotEnv.PASSPHRASE,
            },
            buffer,
        );
        return encrypted.toString("base64");
    }

    public decrypt<T>(data: string): T {
        const buffer = Buffer.from(data, "base64");
        const decrypted = crypto.privateDecrypt(
            {
                key: dotEnv.PRIVATE_KEY!,
                passphrase: dotEnv.PASSPHRASE,
            },
            buffer,
        );
        return JSON.parse(decrypted.toString("utf8"));
    }

    public publicDecrypt<T>(data: string): T {
        const buffer = Buffer.from(data, "base64");
        const decrypted = crypto.publicDecrypt(dotEnv.PUBLIC_ENCRYPTION_KEY!, buffer);
        return JSON.parse(decrypted.toString("utf8"));
    }

    public publicEncrypt<T>(data: T): string {
        const buffer = Buffer.from(JSON.stringify(data));

        const encrypted = crypto.publicEncrypt(dotEnv.PUBLIC_ENCRYPTION_KEY!, buffer);
        return encrypted.toString("base64");
    }

    public encryptDataUsingRsaWithAes<T>(data: T): CryptoEncryptedDataResponse {
        // Generate a random AES key and IV
        const aesKey = crypto.randomBytes(32); // 256-bit key
        const iv = crypto.randomBytes(16); // 128-bit IV

        const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, iv);
        let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
        encrypted += cipher.final("base64");
        const authTag = cipher.getAuthTag().toString("base64"); // Ensure integrity

        // Encrypt AES key using RSA
        const encryptedKey = crypto
            .privateEncrypt(
                {
                    key: dotEnv.PRIVATE_KEY!,
                    passphrase: dotEnv.PASSPHRASE,
                },
                aesKey,
            )
            .toString("base64");
        return { encrypted, meta: { encryptedKey, iv: iv.toString("base64"), authTag } };
    }

    public publicDecryptDataUsingRsaWithAes<T>(encrypted: string, meta: CryptoEncryptedMetaData): T | string {
        const aesKey = this._publicDecryptAESKey(meta.encryptedKey);
        const decipher = crypto.createDecipheriv("aes-256-gcm", aesKey, Buffer.from(meta.iv, "base64"));
        decipher.setAuthTag(Buffer.from(meta.authTag, "base64"));

        let decrypted = decipher.update(encrypted, "base64", "utf8");
        decrypted += decipher.final("utf8");

        /**
         * @description - Parsing the decrypted content if its parsable otherwise return the decrypted string;
         */
        try {
            return JSON.parse(decrypted);
        } catch (error) {
            logger.error("", error);
            return decrypted;
        }
    }

    public publicEncryptDataUsingRsaWithAes<T>(data: T): CryptoEncryptedDataResponse {
        // Generate a random AES key and IV
        const aesKey = crypto.randomBytes(32); // 256-bit key
        const iv = crypto.randomBytes(16); // 128-bit IV

        const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, iv);
        let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
        encrypted += cipher.final("base64");
        const authTag = cipher.getAuthTag().toString("base64"); // Ensure integrity

        // // Encrypt AES key using RSA
        const encryptedKey = crypto.publicEncrypt(dotEnv.PUBLIC_ENCRYPTION_KEY!, aesKey).toString("base64");
        return { encrypted, meta: { encryptedKey, iv: iv.toString("base64"), authTag } };
    }

    public decryptDataUsingRsaWithAes<T>(encrypted: string, meta: CryptoEncryptedMetaData): T | string {
        const { encryptedKey, iv, authTag } = meta;
        const aesKey = this._decryptAESKey(encryptedKey);
        const decipher = crypto.createDecipheriv("aes-256-gcm", aesKey, Buffer.from(iv, "base64"));
        decipher.setAuthTag(Buffer.from(authTag, "base64"));

        let decrypted = decipher.update(encrypted, "base64", "utf8");
        decrypted += decipher.final("utf8");

        /**
         * @description - Parsing the decrypted content if its parsable otherwise return the decrypted string;
         */
        try {
            return JSON.parse(decrypted);
        } catch (error) {
            logger.error(error);
            return decrypted;
        }
    }
}
