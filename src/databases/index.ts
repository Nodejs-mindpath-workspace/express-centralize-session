import { connect, MongooseOptions, set } from "mongoose";

import constants from "../constants/constant";
import logger from "../swaggers/helpers/logger";

const options: MongooseOptions = {
    strictQuery: constants.LITERALS.BOOLEAN.TRUE(),
    debug: constants.LITERALS.BOOLEAN.TRUE(),
};

set(options);

export default class MongoDB {
    public static async connect(uri: string): Promise<void> {
        try {
            await connect(uri);
            logger.info(`Database successfully connected!`);
        } catch (error) {
            logger.error(`Failed to the database`, error);
            // kill process if failed to connect to the database
            process.exit(1);
        }
    }
}
