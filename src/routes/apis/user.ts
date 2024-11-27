import { NextFunction, Response, Router } from "express";

import constants from "../../constants/constant";
import expressConstants from "../../constants/express";
import AuthContext from "../../contexts/auth";
import UserContext from "../../contexts/user";
import { CustomRequest } from "../../types/requests/express/customRequest";

const userApiRoutes: Router = Router({ mergeParams: constants.LITERALS.BOOLEAN.TRUE() });

userApiRoutes.post("/login", (...arg: [CustomRequest, Response, NextFunction]): void => {
    UserContext.getControllerContext().login(...arg);
});

userApiRoutes.use(AuthContext.getMiddlewareContext().checkAuth);

// GET routes
userApiRoutes.get(expressConstants.ROUTER_PATH.APIS.ME, (...arg: [CustomRequest, Response, NextFunction]): void => {
    UserContext.getControllerContext().getMe(...arg);
});
userApiRoutes.get(expressConstants.ROUTER_PATH.APIS.INDEX, (...arg: [CustomRequest, Response, NextFunction]): void => {
    UserContext.getControllerContext().getUsers(...arg);
});

export default userApiRoutes;
