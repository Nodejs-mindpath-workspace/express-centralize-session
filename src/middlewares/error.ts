import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import HttpStatus from "http-status-codes";

import constants from "../constants/constant";
import IAnyObjectValue from "../interfaces/anyObjectValue";
import ExpressError from "../swaggers/helpers/expressError";
import logger from "../swaggers/helpers/logger";

export default class ErrorMiddleware {
    public static notFoundHandle(_req: Request, _res: Response, next: NextFunction): void {
        return next(createError(HttpStatus.NOT_FOUND));
    }

    public static errorHandle(error: ExpressError, req: Request, res: Response, _next: NextFunction): void {
        // set locals, only providing error in development
        logger.error(error);
        res.locals.message = error.message;
        res.locals.error = req.app.get("env") === "development" ? error : {};
        const title: string = constants.LITERALS.STRING.EMPTY();
        const layout: string = "./layouts/default.layout.ejs";
        const siteUrl: string = `${req.protocol}://${req.get("host")}`;
        const options: IAnyObjectValue = {
            layout,
            siteUrl,
            title,
            dbUser: undefined,
            start: constants.LITERALS.BOOLEAN.FALSE(),
            error,
        };
        // render the error page
        const status: number = (<ExpressError>error).status ?? HttpStatus.INTERNAL_SERVER_ERROR;
        const view: string =
            status === HttpStatus.NOT_FOUND
                ? "errors/404"
                : status === HttpStatus.UNAUTHORIZED
                  ? "errors/401"
                  : "errors/error";
        return res.status(status).render(view, options);
    }

    public static apiErrorHandle(error: ExpressError, _req: Request, res: Response, _next: NextFunction): void {
        logger.error(error);
        const message: string = error instanceof ExpressError ? error.message : (<Error>error).message;
        const status: number = error.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
        res.status(status).send({ error: { message } });
    }
}
