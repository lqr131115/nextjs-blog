export type UserInfo = Partial<{
  userId: number;
  nickname: string;
  avatar: string;
  job: string;
  introduce: string;
}>;

export interface IUserState {
  userInfo: UserInfo;
  setUserInfo?: (userInfo: UserInfo) => void;
}
const defaultUserInfo: UserInfo = {
  avatar: "/image/avatar.png",
};

const userState: IUserState = {
  userInfo: defaultUserInfo,
  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  },
};

export default userState;
