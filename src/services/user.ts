import { StatusCodes } from "http-status-codes";

import IUserDocument from "../interfaces/users/documents/user";
import UserRepository from "../repositories/user";
import ExpressError from "../swaggers/helpers/expressError";
import IUser from "../interfaces/users/user";

export default class UserService {
    private readonly _userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    public async getUsers(): Promise<Array<IUserDocument>> {
        return await this._userRepository.getUsers();
    }

    public async getUserById(id: string): Promise<IUserDocument> {
        const dbUser: IUserDocument | null = await this._userRepository.getUserById(id);
        if (!dbUser) throw new ExpressError("No User found by Id", StatusCodes.NOT_FOUND);
        return dbUser;
    }

    public async addUser(user: IUser): Promise<IUserDocument> {
        return await this._userRepository.addUser(user);
    }

    public async updateUserById(id: string, user: IUser): Promise<IUserDocument> {
        const dbUser: IUserDocument | null = await this._userRepository.updateUserById(id, user);
        if (!dbUser) throw new ExpressError("No User found by Id", StatusCodes.NOT_FOUND);
        return dbUser;
    }

    public async deleteUserById(id: string): Promise<IUserDocument> {
        const dbUser: IUserDocument | null = await this._userRepository.deleteUserById(id);
        if (!dbUser) throw new ExpressError("No User found by Id", StatusCodes.NOT_FOUND);
        return dbUser;
    }

    public async login(user: IUser): Promise<IUserDocument> {
        let dbUser: IUserDocument | null = await this._userRepository.getUserByEmail(user.email);
        if (!dbUser) dbUser = await this._userRepository.addUser(user);
        return dbUser;
    }
}
