import { _axios } from "@/services/axiosService";
import { LoginDTO, Tokens, User } from "@types";
import { ADMIN_URL } from ".";
import { HTTP_METHOD } from "..";

export const adminLogin = async (data: LoginDTO) => {
  return _axios<{ memberInfo: User; tokenInfo: Tokens }>({
    url: `${ADMIN_URL}/login`,
    method: HTTP_METHOD.POST,
    data,
  });
};
