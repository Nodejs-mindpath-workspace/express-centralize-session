import { Request } from "express";

import EmptyObject from "./emptyObject";
import CustomSessionWithPartialSessionData from "./customSessionWithPartialData";

export type PathParams<T = EmptyObject> = T;
export type ApiResponse<T = EmptyObject> = { status: number; data: T | string; message: string };
export type RequestBody<T = EmptyObject> = T;
export type QueryParams<T = EmptyObject> = T;

export type CustomRequest = Request & {
    session: CustomSessionWithPartialSessionData;
};

export type CustomAPIRequest<
    Path = EmptyObject,
    ResBody = EmptyObject,
    ReqBody = EmptyObject,
    Query = EmptyObject,
> = Request<Path, ResBody, ReqBody, Query> & {
    session: CustomSessionWithPartialSessionData;
};
