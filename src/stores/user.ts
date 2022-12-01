import { User } from "@types";
import { atom, useRecoilState } from "recoil";

export const userState = atom<User | undefined>({
  key: "userState",
  default: undefined,
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);

  return { user, hasAuth: !!user };
};
