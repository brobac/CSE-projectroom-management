import { LoginDTO, MemberComplexInfo, SignupDTO, Tokens, User } from "@types";

import { HTTP_METHOD } from ".";
import { getJWTHeader, _axios } from "../axiosService";

const membersURL = "/members";

// <----- 회원가입 관련 API -----

export const signup = async (data: SignupDTO) => {
  return _axios<boolean>({
    url: `${membersURL}`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const checkDuplicatedEmail = async (email: string) => {
  return _axios<boolean>({
    url: `${membersURL}/duplicated-email`,
    method: HTTP_METHOD.GET,
    params: { email },
  });
};

export const checkDuplicatedLoginId = async (loginId: string) => {
  return _axios<boolean>({
    url: `${membersURL}/duplicated-loginid`,
    method: HTTP_METHOD.GET,
    params: { loginId },
  });
};

// ----- 회원가입 관련 API ----->

// <----- 로그인 관련 API -----

export const login = async (data: LoginDTO) => {
  return _axios<{ memberInfo: User; tokenInfo: Tokens }>({
    url: `${membersURL}/login`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const logout = async (data: Tokens) => {
  return _axios<void>({
    url: `${membersURL}/logout`,
    method: HTTP_METHOD.DELETE,
    data,
  });
};

export const tokenReissue = async (refreshToken: string) => {
  return _axios<Tokens>({
    url: `${membersURL}/logout`,
    method: HTTP_METHOD.DELETE,
    params: refreshToken,
  });
};

export const userReissue = async () => {
  return _axios<User>({
    url: `${membersURL}/reissue`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};

// ----- 로그인 관련 API ----->

export const fetchMemberComplexInfo = async (userId: number) => {
  return _axios<MemberComplexInfo>({
    url: `${membersURL}/${userId}`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};
