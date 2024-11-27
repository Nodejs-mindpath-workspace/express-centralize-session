import { Model } from "mongoose";

import userModel from "../databases/models/user";
import IUserDocument from "../interfaces/users/documents/user";
import IUser from "../interfaces/users/user";

export default class UserRepository {
    private readonly _userModel: Model<IUserDocument> = userModel;

    public async getUsers(): Promise<Array<IUserDocument>> {
        return await this._userModel.find<IUserDocument>();
    }

    public async getUserById(id: string): Promise<IUserDocument | null> {
        return await this._userModel.findById<IUserDocument>(id);
    }

    public async addUser(user: IUser): Promise<IUserDocument> {
        const dbUser: IUserDocument = new this._userModel(user);
        return await dbUser.save();
    }

    public async updateUserById(id: string, user: IUser): Promise<IUserDocument | null> {
        return await this._userModel.findByIdAndUpdate<IUserDocument>(id, user);
    }

    public async deleteUserById(id: string): Promise<IUserDocument | null> {
        return await this._userModel.findByIdAndDelete<IUserDocument>(id);
    }

    public async getUserByEmail(email: string): Promise<IUserDocument | null> {
        return await this._userModel.findOne<IUserDocument>({ email });
    }
}
