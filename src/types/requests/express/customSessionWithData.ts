import { Session } from "express-session";

import SessionData from "./sessionData";

type CustomSessionWithSessionData = Session & SessionData;

export default CustomSessionWithSessionData;
