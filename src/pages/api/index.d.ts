import { IronSession } from "iron-session";

export type ISession = IronSession & { verifyCode: string };
