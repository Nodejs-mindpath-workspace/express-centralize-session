type DotEnv = {
    PORT: number;
    NODE_ENV: "development" | "production";
    SITE_URL: string;
    EXPRESS_SESSION_SECRET: string;
    MONGODB_CONNECTION_STRING: string;
};

export default DotEnv;
