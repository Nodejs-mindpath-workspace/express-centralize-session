declare global {
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        interface ProcessEnv {
            PORT: number;
            NODE_ENV: "development" | "production";
            SITE_URL: string;
            EXPRESS_SESSION_SECRET: string;
            MONGODB_CONNECTION_STRING: string;
            PRIVATE_KEY: string;
            PASSPHRASE: string;
            PUBLIC_ENCRYPTION_KEY: string;
            INTUIT_CLIENT_ID: string;
            INTUIT_CLIENT_SECRET: string;
            INTUIT_REDIRECT_URI: string;
            INTUIT_ENVIRONMENT: string;
        }
    }
}

export {};
