import { NextFunction, Response } from "express";

import { StatusCodes } from "http-status-codes";

import expressConstants from "../constants/express";
import IUserDocument from "../interfaces/users/documents/user";
import UserService from "../services/user";
import ApiResponse from "../swaggers/types/responses/apiResponse";
import { CustomRequest } from "../types/requests/express/customRequest";
import CustomSessionWithSessionData from "../types/requests/express/customSessionWithData";

export default class UserController {
    private readonly _userService: UserService;

    public constructor(userService: UserService) {
        this._userService = userService;
    }

    public async login(
        req: CustomRequest,
        res: Response<ApiResponse<IUserDocument>>,
        next: NextFunction,
    ): Promise<void | Response<ApiResponse<IUserDocument>>> {
        try {
            req.session.dbUser = await this._userService.login(req.body);
            const status: number = StatusCodes.CREATED;
            const response: ApiResponse<IUserDocument> = {
                status,
                message: expressConstants.MESSAGE.SUCCESS,
                data: req.session.dbUser,
            };
            return res.status(status).send(response);
        } catch (error) {
            return next(error);
        }
    }

    public async getUsers(
        _req: CustomRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response<ApiResponse<Array<IUserDocument>>>> {
        try {
            const dbUsers: Array<IUserDocument> = await this._userService.getUsers();
            const status: number = StatusCodes.OK;
            const response: ApiResponse<Array<IUserDocument>> = {
                status,
                message: expressConstants.MESSAGE.SUCCESS,
                data: dbUsers,
            };
            return res.status(status).send(response);
        } catch (error) {
            return next(error);
        }
    }

    public async getMe(
        req: CustomRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response<ApiResponse<IUserDocument>>> {
        try {
            const { dbUser }: CustomSessionWithSessionData = <CustomSessionWithSessionData>req.session;
            const status: number = StatusCodes.OK;
            const response: ApiResponse<IUserDocument> = {
                status,
                message: expressConstants.MESSAGE.SUCCESS,
                data: dbUser,
            };
            return res.status(status).send(response);
        } catch (error) {
            return next(error);
        }
    }
}
