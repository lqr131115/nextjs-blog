import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { nanoid } from "nanoid";
import { Cookie } from "next-cookie";
import { User, UserAuth } from "@/db/entity";
import { AppDataSource } from "@/db";
import { ironSessionOptions } from "@/config";
import { setCookies } from "@/utils";
import { ISession } from "..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { phone, verification, identifyType = "phone", agreement } = req.body;
    // 服务端校验
    if (!phone) {
      res.status(200).json({ code: -1, msg: "请输入账号" });
      return;
    }
    if (!verification) {
      res.status(200).json({ code: -1, msg: "请输入验证码" });
      return;
    }
    if (!agreement) {
      res.status(200).json({ code: -1, msg: "请先勾选协议" });
      return;
    }
    const session: ISession = await getIronSession(
      req,
      res,
      ironSessionOptions
    );
    if (session.verifyCode == null) {
      res.status(200).json({ code: -1, msg: "验证码已过期" });
      return;
    }
    const cookies = Cookie.fromApiRoute(req, res);
    const verifyCode = session.verifyCode.toString();
    // const userRep = AppDataSource.isInitialized
    //   ? AppDataSource.getRepository(User)
    //   : (await AppDataSource.initialize()).getRepository(User);
    const userAuthRep = AppDataSource.isInitialized
      ? AppDataSource.getRepository(UserAuth)
      : (await AppDataSource.initialize()).getRepository(UserAuth);

    if (verification === verifyCode) {
      const exist = await userAuthRep.findOne({
        where: { identifier: phone, identify_type: identifyType },
        relations: ["user"], // 返回信息中包含User信息
      });
      // console.log("exist", exist);
      if (exist) {
        const { user } = exist;
        // 设置session
        session.user = user;
        await session.save();
        // 设置cookie
        const { id, avatar, nickname } = user;
        setCookies(cookies, { id, avatar, nickname });
        // TODO: 脱敏
        res.status(200).json({ code: 0, msg: "register success", data: user });
      } else {
        // 自动注册
        const user = new User();
        user.nickname = `用户_${nanoid(8).toUpperCase()}`;
        user.avatar = "/image/avatar.png";
        user.job = "暂无";
        user.introduce = "暂无";

        const userAuth = new UserAuth();
        userAuth.identify_type = identifyType;
        userAuth.identifier = phone;
        userAuth.credential = verifyCode;
        userAuth.user = user; // 作了级联 User也会自动创建

        const auth = await userAuthRep.save(userAuth); // 作了级联 User也会自动创建
        const { user: u } = auth;
        // 设置session
        session.user = u;
        await session.save();
        // 设置cookie
        const { id, avatar, nickname } = u;
        setCookies(cookies, { id, avatar, nickname });

        res.status(200).json({ code: 0, msg: "register success", data: u });
      }
    }
  } catch (error) {
    console.log("login error", error);
  }
}
