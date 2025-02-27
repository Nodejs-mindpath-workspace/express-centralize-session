import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import IntuitService from "../services/intuit";

export default class IntuitController {
    private readonly _intuitService: IntuitService;

    public constructor(intuitService: IntuitService) {
        this._intuitService = intuitService;
    }

    public getAuthLoginUrl(_req: Request, res: Response, next: NextFunction): void {
        try {
            const authUri: string = this._intuitService.getAuthUrl();
            res.status(StatusCodes.OK).redirect(authUri);
        } catch (error) {
            next(error);
        }
    }

    public async getAuthCallback(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const client = await this._intuitService.getAccessToken(req.url);
            res.status(StatusCodes.OK).send(client);
        } catch (error) {
            next(error);
        }
    }
}
