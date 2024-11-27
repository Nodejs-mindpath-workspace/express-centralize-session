import { Session } from "express-session";

import SessionData from "./sessionData";

type CustomSessionWithPartialSessionData = Session & Partial<SessionData>;

export default CustomSessionWithPartialSessionData;
