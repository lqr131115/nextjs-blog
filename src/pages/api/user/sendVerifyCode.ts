import { NextApiRequest, NextApiResponse } from "next";
import { format } from "date-fns";
import md5 from "md5";
import { encode } from "js-base64";
import { getIronSession } from "iron-session";
import request from "@/service/fetch";
import { ironSessionOptions } from "@/config/index";
import { ISession } from "..";

const OPEN_ACCOUNT_SID = "2c94811c8cd4da0a018f286e7e2e7687";
const OPEN_AUTH_TOKEN = "d572a988ee5f4938aa49f24a007b15c4";
const OPEN_RESt_URL = "https://app.cloopen.com:8883";
const OPEN_APP_ID = "2c94811c8cd4da0a018f286e7fc7768e";
const VALIDATE_STATUS_CODE = "000000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: ISession = await getIronSession(req, res, ironSessionOptions);
  // 连接第三方短信服务商，发送验证码
  const { to, templateId = "1" } = req.body;
  const NowData = format(new Date(), "yyyyMMddHHmmss");
  const SigParameter = md5(
    OPEN_ACCOUNT_SID + OPEN_AUTH_TOKEN + NowData
  ).toUpperCase();
  const Authorization = encode(`${OPEN_ACCOUNT_SID}:${NowData}`);
  const url = `${OPEN_RESt_URL}/2013-12-26/Accounts/${OPEN_ACCOUNT_SID}/SMS/TemplateSMS?sig=${SigParameter}`;
  const code = (1000 + Math.random() * 8999) >> 0,
    expire = 5;
  const response = await request.post(
    url,
    { to, templateId, appId: OPEN_APP_ID, datas: [code, expire] },
    {
      headers: {
        Authorization,
      },
    }
  );
  const { statusCode, statusMsg, templateSMS } = response as any;
  if (statusCode === VALIDATE_STATUS_CODE) {
    session.verifyCode = code;
    await session.save();
    res.status(200).json({ code: 0, msg: statusMsg, data: templateSMS });
  } else {
    res.status(200).json({ code: statusCode, msg: statusMsg });
  }
}
