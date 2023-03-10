import {
  LoginDTO,
  MemberComplexInfo,
  SignupDTO,
  Tokens,
  User,
  VerifyEmailAuthCodeDTO,
} from "@types";

import { HTTP_METHOD } from ".";
import { getJWTHeader, _axios } from "../axiosService";

const membersURL = "members";
const versionURL = "v1";
const signupURL = "signup";

// <----- 회원가입 관련 API -----

//회원가입
export const signup = async (data: SignupDTO) => {
  return _axios<boolean>({
    url: `/${versionURL}/${membersURL}/${signupURL}`,
    method: HTTP_METHOD.POST,
    data,
  });
};

//이메일 중복 체크
export const checkDuplicatedEmail = async (email: string) => {
  return _axios<boolean>({
    url: `/${versionURL}/${membersURL}/${signupURL}/check-email`,
    method: HTTP_METHOD.GET,
    params: { email },
  });
};

//아이디 중복체크
export const checkDuplicatedLoginId = async (loginId: string) => {
  return _axios<boolean>({
    url: `/${versionURL}/${membersURL}/${signupURL}/check-id`,
    method: HTTP_METHOD.GET,
    params: { loginId },
  });
};

//이메일로 인증코드 보내기
export const sendAuthCodeToEmail = async (email: string) => {
  return _axios<boolean>({
    url: `/${versionURL}/${membersURL}/${signupURL}/authcode`,
    method: HTTP_METHOD.GET,
    params: { email },
  });
};

//이메일 인증코드 확인
export const verifyEmailAuthCode = async (data: VerifyEmailAuthCodeDTO) => {
  return _axios<boolean>({
    url: `/${versionURL}/${membersURL}/${signupURL}/authcode`,
    method: HTTP_METHOD.GET,
    data,
  });
};

// ----- 회원가입 관련 API ----->

// <----- 로그인 관련 API -----

export const login = async (data: LoginDTO) => {
  return _axios<{ memberInfo: User; tokenInfo: Tokens }>({
    url: `/${versionURL}/${membersURL}/login`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const logout = async (data: Tokens) => {
  return _axios<void>({
    url: `/${versionURL}/${membersURL}/logout`,
    method: HTTP_METHOD.DELETE,
    data,
  });
};

export const tokenReissue = async (refreshToken: string) => {
  return _axios<Tokens>({
    url: `/${versionURL}/${membersURL}/token/reissue`,
    method: HTTP_METHOD.POST,
    params: refreshToken,
  });
};

export const userReissue = async () => {
  return _axios<User>({
    url: `/${versionURL}/${membersURL}/reissue`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};

// ----- 로그인 관련 API ----->

export const fetchMemberComplexInfo = async (userId: number) => {
  return _axios<MemberComplexInfo>({
    url: `/${versionURL}/${membersURL}/${userId}`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};
