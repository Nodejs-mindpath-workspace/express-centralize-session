import AuthMiddleware from "../middlewares/auth";
import UserRepository from "../repositories/user";
import UserService from "../services/user";

export default class AuthContext {
    public static getMiddlewareContext(): AuthMiddleware {
        const userRepository: UserRepository = new UserRepository();
        const userService: UserService = new UserService(userRepository);
        return new AuthMiddleware(userService);
    }
}
