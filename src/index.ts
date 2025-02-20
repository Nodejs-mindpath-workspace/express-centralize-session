import "dotenv/config";

import express from "express";
import session from "express-session";

import helmet from "helmet";
import morgan from "morgan";
import { join } from "path";

import constants from "./constants/constant";
import dotEnv from "./constants/dotEnv";
import expressConstants from "./constants/express";
import MongoDB from "./databases";
import ExpressInterceptor from "./helpers/express";
import ErrorMiddleware from "./middlewares/error";
import apiRoutes from "./routes/apis";
import logger from "./swaggers/helpers/logger";
import SwaggerHelper from "./swaggers/helpers/swagger";
import IServeSwaggerOptions from "./swaggers/interfaces/swaggerOptions";

const app: express.Express = express();
const port: number = dotEnv.PORT;
const mongodbConnectionString: string = dotEnv.MONGODB_CONNECTION_STRING;

MongoDB.connect(mongodbConnectionString);

// Use 'qs' instead of 'querystring'
// app.set('query parser', 'extended');

// middleware
app.use(helmet.hsts({ maxAge: 123456 }));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(morgan("dev"));

// set up express sessions
app.use(session(expressConstants.EXPRESS_SESSION()));

// INTERCEPTOR:
app.use((...arg) => new ExpressInterceptor().interceptRequest(...arg));
app.use((...arg) => new ExpressInterceptor().interceptResponse(...arg));

// API Routes
app.use(expressConstants.ROUTER_PATH.APIS.BASE_PATH, apiRoutes);
app.use(expressConstants.ROUTER_PATH.APIS.BASE_PATH, ErrorMiddleware.notFoundHandle);
app.use(expressConstants.ROUTER_PATH.APIS.BASE_PATH, ErrorMiddleware.apiErrorHandle);

// View Routess

// NOTE: Swagger integration for the APIs.
const swaggerOptions: IServeSwaggerOptions = {
    apiBashPath: constants.LITERALS.STRING.EMPTY(),
    apiRoutePath: join(__dirname, "routes/apis"),
    ignorePaths: [join(__dirname, "routes/apis/**/*.d.ts"), join(__dirname, "routes/apis/**/*.d.ts.map")],
    saveSwaggerDocumentFilePath: join(__dirname, "swagger.js"),
    serverOrigin: `${dotEnv.SITE_URL}`,
    routePaths: [
        {
            filePath: join(__dirname, "routes/apis"),
            urlBasePath: "/apis",
        },
    ],
    definition: {
        title: "Mindpath Quiz",
        description: "",
        version: "0.1.0",
        license: {
            name: "Mindpath Path",
        },
    },
};
SwaggerHelper.serveSwagger(swaggerOptions);

app.listen(port, (): void => {
    try {
        logger.info(`Server is listening, http://localhost:${port}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
});
