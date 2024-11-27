import { model, Model, Schema } from "mongoose";

import constants from "../../constants/constant";
import USER_ROLE_ENUM from "../../enums/users/role";
import IUserDocument from "../../interfaces/users/documents/user";

const userSchema: Schema<IUserDocument> = new Schema<IUserDocument>(
    {
        name: {
            type: String,
            required: constants.LITERALS.BOOLEAN.TRUE(),
        },
        email: {
            type: String,
            required: constants.LITERALS.BOOLEAN.TRUE(),
        },
        role: {
            type: String,
            enum: USER_ROLE_ENUM,
            default: USER_ROLE_ENUM.GUEST,
        },
    },
    {
        timestamps: constants.LITERALS.BOOLEAN.TRUE(),
    },
);

const userModel: Model<IUserDocument> = model<IUserDocument>("users", userSchema);
export default userModel;
