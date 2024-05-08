export type UserInfo = Partial<{
  id: number | null;
  nickname: string;
  avatar: string;
  [key: string]: any;
}>;

export interface IUserState {
  userInfo: UserInfo;
  setUserInfo?: (userInfo: UserInfo) => void;
}
const defaultUserInfo: UserInfo = {
  id: null,
  avatar: "/image/avatar.png",
};

const userState: IUserState = {
  userInfo: defaultUserInfo,
  // 没有传递userInfo即重置
  setUserInfo(userInfo: UserInfo = defaultUserInfo) {
    this.userInfo = userInfo;
  },
};

export default userState;
