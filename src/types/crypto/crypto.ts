export type CryptoEncryptedMetaData = {
    encryptedKey: string;
    iv: string;
    authTag: string;
};

export type CryptoEncryptedDataResponse = {
    encrypted: string;
    meta: CryptoEncryptedMetaData;
};
