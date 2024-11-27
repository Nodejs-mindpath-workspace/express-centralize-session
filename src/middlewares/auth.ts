import { NextFunction, Response } from "express";

import { StatusCodes } from "http-status-codes";

import UserService from "../services/user";
import ExpressError from "../swaggers/helpers/expressError";
import { CustomRequest } from "../types/requests/express/customRequest";

export default class AuthMiddleware {
    private readonly _userService: UserService;

    public constructor(userService: UserService) {
        this._userService = userService;
    }

    public async checkAuth(req: CustomRequest, _res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.session.dbUser) {
                req.session.dbUser = await this._userService.getUserById(`${req.session.dbUser._id}`);
                return next();
            } else {
                throw new ExpressError("Unauthorized user", StatusCodes.UNAUTHORIZED);
            }
        } catch (error) {
            return next(error);
        }
    }
}
