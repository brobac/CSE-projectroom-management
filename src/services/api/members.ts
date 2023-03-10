import { LoginDTO, MemberComplexInfo, SignupDTO, Tokens, User } from "@types";

import { HTTP_METHOD } from ".";
import { getJWTHeader, _axios } from "../axiosService";

const membersURL = "members";
const versionURL = "v1";
const signupURL = "signup";

// <----- 회원가입 관련 API -----

export const signup = async (data: SignupDTO) => {
  return _axios<boolean>({
    url: `${versionURL}/${membersURL}/${signupURL}`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const checkDuplicatedEmail = async (email: string) => {
  return _axios<boolean>({
    url: `${versionURL}/${membersURL}/${signupURL}/check-email`,
    method: HTTP_METHOD.GET,
    params: { email },
  });
};

export const checkDuplicatedLoginId = async (loginId: string) => {
  return _axios<boolean>({
    url: `${versionURL}/${membersURL}/${signupURL}/check-id`,
    method: HTTP_METHOD.GET,
    params: { loginId },
  });
};

//TODO: sendAuthCodeToEmail 이메일로 인증 코드 요청

//TODO: verifyAuthCodeToEmail 인증코드 확인

// ----- 회원가입 관련 API ----->

// <----- 로그인 관련 API -----

export const login = async (data: LoginDTO) => {
  return _axios<{ memberInfo: User; tokenInfo: Tokens }>({
    url: `${versionURL}/${membersURL}/login`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const logout = async (data: Tokens) => {
  return _axios<void>({
    url: `${versionURL}/${membersURL}/logout`,
    method: HTTP_METHOD.DELETE,
    data,
  });
};

export const tokenReissue = async (refreshToken: string) => {
  return _axios<Tokens>({
    url: `${versionURL}/${membersURL}/token/reissue`,
    method: HTTP_METHOD.POST,
    params: refreshToken,
  });
};

export const userReissue = async () => {
  return _axios<User>({
    url: `${versionURL}/${membersURL}/reissue`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};

// ----- 로그인 관련 API ----->

export const fetchMemberComplexInfo = async (userId: number) => {
  return _axios<MemberComplexInfo>({
    url: `${versionURL}/${membersURL}/${userId}`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};
