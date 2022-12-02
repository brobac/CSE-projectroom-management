import { queryKeys } from "@/services/react-query/queryKeys";
import { storageService, userReissue } from "@services";
import { useQuery } from "@tanstack/react-query";
import { User } from "@types";
import { atom, useRecoilState } from "recoil";

export const userState = atom<User | undefined>({
  key: "userState",
  default: undefined,
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);

  const refreshUser = async () => {
    const tokens = storageService.getStoredToken();
    if (!tokens) return;

    await userReissue()
      .then((res) => {
        storageService.setStoredUser(res.result);
        setUser(res.result);
      })
      .catch((err) => console.log("시발"));
  };

  return { user, hasAuth: !!user, refreshUser };
};
