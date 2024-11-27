import { SessionOptions } from "express-session";

type ExpressConstants = {
    EXPRESS_SESSION: () => SessionOptions;
    MESSAGE: {
        SUCCESS: "success";
        FAILED: "failed";
    };
    ROUTER_PATH: {
        APIS: {
            BASE_PATH: string;
            USERS: string;
            ID_PARAM: string;
            INDEX: string;
            ME: string;
            LOGIN: string;
        };
    };
};

export default ExpressConstants;
