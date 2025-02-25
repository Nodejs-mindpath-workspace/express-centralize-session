import { Router } from "express";

import constants from "../../../constants/constant";
import expressConstants from "../../../constants/express";
import intuitAuthApiRoutes from "./auth";

const intuitApiRoutes: Router = Router({ mergeParams: constants.LITERALS.BOOLEAN.TRUE() });

// Route: /api/intuit/auth
intuitApiRoutes.use(expressConstants.ROUTER_PATH.APIS.AUTH, intuitAuthApiRoutes);

export default intuitApiRoutes;