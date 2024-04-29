export default function handler(req: any, res: any) {
  const { phone } = req.body;
  // 连接第三方短信服务商，发送验证码
  res.status(200).json({ message: "Hello from Next.js!", phone });
}
