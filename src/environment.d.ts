declare global {
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        interface ProcessEnv {
            PORT: number;
            NODE_ENV: "development" | "production";
            SITE_URL: string;
            EXPRESS_SESSION_SECRET: string;
            MONGODB_CONNECTION_STRING: string;
        }
    }
}

export {};
