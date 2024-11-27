import { Router } from "express";

import constants from "../../constants/constant";
import userApiRoutes from "./user";

const apiRoutes: Router = Router({ mergeParams: constants.LITERALS.BOOLEAN.TRUE() });

apiRoutes.use("/users", userApiRoutes);

export default apiRoutes;
