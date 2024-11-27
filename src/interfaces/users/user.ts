import USER_ROLE_ENUM from "../../enums/users/role";

interface IUser {
    name: string;
    email: string;
    role: USER_ROLE_ENUM;
}

export default IUser;
