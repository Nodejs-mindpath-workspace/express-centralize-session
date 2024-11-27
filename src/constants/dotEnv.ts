import DotEnv from "../types/constants/dotEnv";
import constants from "./constant";

const dotEnv: DotEnv = {
    PORT: process.env.PORT ?? 3000,
    NODE_ENV: process.env.NODE_ENV ?? constants.LITERALS.STRING.EMPTY(),
    SITE_URL: process.env.SITE_URL ?? constants.LITERALS.STRING.EMPTY(),
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET ?? constants.LITERALS.STRING.EMPTY(),
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING ?? constants.LITERALS.STRING.EMPTY(),
};

export default dotEnv;
