import { Router } from "express";

import constants from "../../../constants/constant";
import expressConstants from "../../../constants/express";
import IntuitContext from "../../../contexts/intuit";

const intuitAuthApiRoutes: Router = Router({ mergeParams: constants.LITERALS.BOOLEAN.TRUE() });

// Route: /api/intuit/authorization
intuitAuthApiRoutes.get(expressConstants.ROUTER_PATH.APIS.CALLBACK, (...arg) => {
    IntuitContext.getControllerContext().getAuthCallback(...arg);
});

// Route: /api/intuit
intuitAuthApiRoutes.get(expressConstants.ROUTER_PATH.APIS.INDEX, (...arg) => {
    IntuitContext.getControllerContext().getAuthLoginUrl(...arg);
});

export default intuitAuthApiRoutes;
