import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { Cookie } from "next-cookie";
import { ironSessionOptions } from "@/config";
import { clearCookies } from "@/utils";
import { ISession } from "..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 清除 session
    const session: ISession = await getIronSession(
      req,
      res,
      ironSessionOptions
    );
    await session.destroy();
    //  清除 cookie
    const cookies = Cookie.fromApiRoute(req, res);
    clearCookies(cookies);
    res.status(200).json({ code: 0, msg: "logout success", data: null });
  } catch (error) {
    console.log("login error", error);
  }
}
