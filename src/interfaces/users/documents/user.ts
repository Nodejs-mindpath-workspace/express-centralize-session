import { Document } from "mongoose";

import ITimestamp from "../../timestamp";
import IUser from "../user";

interface IUserDocument extends IUser, Document, ITimestamp {}

export default IUserDocument;
