import { SessionOptions } from "express-session";

import MongoStore from "connect-mongo";

import dotEnv from "./dotEnv";
import ExpressConstants from "../types/constants/express";
import constants from "./constant";

const expressConstants: ExpressConstants = {
    EXPRESS_SESSION: (): SessionOptions => {
        const options: SessionOptions = {
            store: MongoStore.create({
                mongoUrl: dotEnv.MONGODB_CONNECTION_STRING,
                dbName: "sessions",
                ttl: 14 * 24 * 60 * 60, // = 14 days. Default
                autoRemove: "native", // Remove expired sessions
            }),
            secret: dotEnv.EXPRESS_SESSION_SECRET,
            resave: constants.LITERALS.BOOLEAN.FALSE(),
            saveUninitialized: constants.LITERALS.BOOLEAN.FALSE(),
            unset: "destroy",
        };
        return options;
    },
    MESSAGE: {
        SUCCESS: "success",
        FAILED: "failed",
    },
    ROUTER_PATH: {
        APIS: {
            BASE_PATH: "/api",
            USERS: "/users",
            ID_PARAM: "/:id",
            INDEX: "/",
            ME: "/me",
            LOGIN: "/login",
            AUTH: "/auth",
            CALLBACK: "/callback",
            INTUIT: "/intuit",
        },
    },
};

export default expressConstants;
