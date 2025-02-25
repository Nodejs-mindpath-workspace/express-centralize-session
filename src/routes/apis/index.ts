import { Router } from "express";

import constants from "../../constants/constant";
import expressConstants from "../../constants/express";
import intuitApiRoutes from "./intuit";
import userApiRoutes from "./user";

const apiRoutes: Router = Router({ mergeParams: constants.LITERALS.BOOLEAN.TRUE() });

apiRoutes.use(expressConstants.ROUTER_PATH.APIS.USERS, userApiRoutes);
apiRoutes.use(expressConstants.ROUTER_PATH.APIS.INTUIT, intuitApiRoutes);

export default apiRoutes;
