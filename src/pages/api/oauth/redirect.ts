import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { Cookie } from "next-cookie";
import { ironSessionOptions } from "@/config";
import request from "@/service/fetch";
import { User, UserAuth } from "@/db/entity";
import { getRepository } from "@/db";
import { setCookies } from "@/utils";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/constants";
import { ISession } from "..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const identify_type = "github";

  try {
    // 授权码
    const { code } = req?.query;
    // console.log("***********code***********", code);
    // 请求令牌
    // 'https://github.com/login/oauth/access_token?' +
    // `client_id=${clientID}&` +
    // `client_secret=${clientSecret}&` +
    // `code=${requestToken}`,
    const tokenUrl = `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`;
    const tokenRes = await request.post(
      tokenUrl,
      {},
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    // console.log("***********tokenRes***********", tokenRes);
    const { access_token } = tokenRes as any;
    // github用户信息请求
    const userUrl = "https://api.github.com/user";
    const userInfo = await request.get(userUrl, {
      headers: {
        accept: "application/json",
        Authorization: `token ${access_token}`,
      },
    });
    // 登录或者注册, 流程同/api/user/login
    // console.log("***********userInfo***********", userInfo);
    const session: ISession = await getIronSession(
      req,
      res,
      ironSessionOptions
    );
    const cookies = Cookie.fromApiRoute(req, res);
    const userAuthRep = await getRepository(UserAuth);
    const exist = await userAuthRep.findOne({
      where: { identifier: GITHUB_CLIENT_ID, identify_type },
      relations: ["user"], // 返回信息中包含User信息
    });
    console.log("***********exist***********", exist);
    if (exist) {
      // 以前授权登录过, 更新认证
      exist.credential = access_token;
      const { user } = exist;
      // 设置session
      session.user = user;
      await session.save();
      // 设置cookie
      const { id, avatar, nickname } = user;
      setCookies(cookies, { id, avatar, nickname });
      res.writeHead(302, {
        location: "/",
      });
    } else {
      // 自动注册
      const { login = "", avatar_url } = userInfo as any;
      const user = new User();
      user.nickname = login;
      user.avatar = avatar_url;
      user.job = "暂无";
      user.introduce = "暂无";

      const userAuth = new UserAuth();
      userAuth.identify_type = identify_type;
      userAuth.identifier = access_token;
      userAuth.credential = GITHUB_CLIENT_ID as string;
      userAuth.user = user; // 作了级联 User也会自动创建

      const auth = await userAuthRep.save(userAuth); // 作了级联 User也会自动创建
      const { user: u } = auth;
      // 设置session
      session.user = u;
      await session.save();
      // 设置cookie
      const { id, avatar, nickname } = u;
      setCookies(cookies, { id, avatar, nickname });
      res.writeHead(302, {
        location: "/",
      });
    }
  } catch (error) {
    console.log("oauth error", error);
  }
}
