type DotEnv = {
    PORT: number;
    NODE_ENV: "development" | "production";
    SITE_URL: string;
    EXPRESS_SESSION_SECRET: string;
    MONGODB_CONNECTION_STRING: string;
    PRIVATE_KEY: string;
    PASSPHRASE: string;
    PUBLIC_ENCRYPTION_KEY: string;
};

export default DotEnv;
