import IUserDocument from "../../../interfaces/users/documents/user";

type SessionData = {
    redirectTo: string;
    dbUser: IUserDocument;
    previousUrl: string;
};

export default SessionData;
