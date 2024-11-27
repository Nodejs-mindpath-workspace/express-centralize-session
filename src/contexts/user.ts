import UserController from "../controllers/user";
import UserRepository from "../repositories/user";
import UserService from "../services/user";

export default class UserContext {
    public static getControllerContext(): UserController {
        const userRepository: UserRepository = new UserRepository();
        const userService: UserService = new UserService(userRepository);
        return new UserController(userService);
    }
}
