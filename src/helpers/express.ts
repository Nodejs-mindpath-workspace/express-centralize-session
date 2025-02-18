import { NextFunction, Request, Response } from "express";

import CryptoHelper from "./crypto/crypto";


export default class ExpressInterceptor {
    private _parseQueryParams(queryParams: qs.ParsedQs): qs.ParsedQs {
        const parsedQueryParams: qs.ParsedQs = {};

        for (const [key, value] of Object.entries(queryParams)) {
            if (typeof value === "string") parsedQueryParams[key] = new CryptoHelper().decrypt(value);
            else parsedQueryParams[key] = value;
        }

        return parsedQueryParams;
    }

    public interceptRequest(req: Request, _res: Response, next: NextFunction): void {
        try {
            if (typeof req.body === "string" && req.body.length) req.body = new CryptoHelper().decrypt(req.body);
            if (Object.keys(req.query).length) req.query = this._parseQueryParams(req.query);
            return next();
        } catch (error) {
            return next(error);
        }
    }

    public interceptResponse(_req: Request, res: Response, next: NextFunction) {
        try {
            const originalSend = res.send;
            // Override the json function
            res.send = function (body) {
                if (typeof body === "object" && body?.data) {
                    const ModifybodyJson = { ...body, data: new CryptoHelper().encrypt(body.data) };
                    return originalSend.call(res, ModifybodyJson);
                }

                // Modify the response body
                return originalSend.call(res, body);
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }
}
