import DotEnv from "../types/constants/dotEnv";
import constants from "./constant";

const dotEnv: DotEnv = {
    PORT: process.env.PORT ?? 3000,
    NODE_ENV: process.env.NODE_ENV ?? constants.LITERALS.STRING.EMPTY(),
    SITE_URL: process.env.SITE_URL ?? constants.LITERALS.STRING.EMPTY(),
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET ?? constants.LITERALS.STRING.EMPTY(),
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING ?? constants.LITERALS.STRING.EMPTY(),
    PRIVATE_KEY: process.env.PRIVATE_KEY ?? constants.LITERALS.STRING.EMPTY(),
    PASSPHRASE: process.env.PASSPHRASE ?? constants.LITERALS.STRING.EMPTY(),
    PUBLIC_ENCRYPTION_KEY: process.env.PUBLIC_ENCRYPTION_KEY ?? constants.LITERALS.STRING.EMPTY(),
    INTUIT_CLIENT_ID: process.env.INTUIT_CLIENT_ID ?? constants.LITERALS.STRING.EMPTY(),
    INTUIT_CLIENT_SECRET: process.env.INTUIT_CLIENT_SECRET ?? constants.LITERALS.STRING.EMPTY(),
    INTUIT_REDIRECT_URI: process.env.INTUIT_REDIRECT_URI ?? constants.LITERALS.STRING.EMPTY(),
    INTUIT_ENVIRONMENT: process.env.INTUIT_ENVIRONMENT ?? constants.LITERALS.STRING.EMPTY(),
};

export default dotEnv;
