import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { User } from "@/db/entity";
import { AppDataSource } from "@/db";
import { ironSessionOptions } from "@/config";
import { ISession } from "..";
import { da } from "date-fns/locale";
import { connect } from "http2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { phone, verification } = req.body;
    const session: ISession = await getIronSession(
      req,
      res,
      ironSessionOptions
    );
    const verifyCode = session.verifyCode.toString();
    if (!verifyCode) {
      res.status(200).json({ code: -1, msg: "验证码已过期" });
      return;
    }
    if (verifyCode !== verification) {
      res.status(200).json({ code: -1, msg: "验证码错误" });
      return;
    }
    const userRep = AppDataSource.getRepository(User);
    const users = await userRep.find();
    if (users) {
      res.status(200).json({ code: 0, msg: "login success" });
      return;
    }
    // 用户不存在，创建用户
    res.status(200).json({ code: 0, msg: "register success" });
  } catch (error) {
    console.log("login error", error);
  }
}
