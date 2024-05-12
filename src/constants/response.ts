// User Response
export const USER_IS_NOT_LOGIN = { code: 1000, msg: "请先登录" };
export const ACCOUNT_IS_NULL = { code: 10001, msg: "请输入账号" };
export const VERIFY_CODE_IS_NULL = { code: 10002, msg: "请输入验证码" };
export const AGREEMENT_IS_NOT_CHECKED = { code: 10003, msg: "请先勾选协议" };
export const VERIFY_CODE_IS_EXPIRE = { code: 10004, msg: "验证码已过期" };

// Article Response
export const TITLE_IS_NULL = { code: 20000, msg: "文章标题不能为空" };
export const CONTENT_IS_NULL = { code: 20001, msg: "文章内容不能为空" };
export const CREATE_ARTICLE_FAILED = { code: 20002, msg: "创建文章失败" };
export const UPDATE_ARTICLE_FAILED = { code: 20003, msg: "更新文章失败" };
