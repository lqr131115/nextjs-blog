import userState, { IUserState } from "./user";

export interface IRootState {
  user: IUserState;
}

export default function createStore(initialValue: Record<any, any>) {
  return () => ({
    user: { ...userState, ...initialValue?.user },
    // TODO: Add other modules here
  });
}
