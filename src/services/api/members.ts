import {
  LoginDTO,
  MemberComplexInfo,
  SignupDTO,
  Tokens,
  User,
  VerifyEmailAuthCodeDTO,
} from "@types";

import { API_VERSION, HTTP_METHOD } from ".";
import { getJWTHeader, _axios } from "../axiosService";

const membersURL = "members";
const signupURL = "signup";

// <----- 회원가입 관련 API -----

//회원가입
export const signup = async (data: SignupDTO) => {
  return _axios<boolean>({
    url: `/${API_VERSION.v1}/${membersURL}/${signupURL}`,
    method: HTTP_METHOD.POST,
    data,
  });
};

//이메일 중복 체크
export const checkDuplicatedEmail = async (email: string) => {
  return _axios<boolean>({
    url: `/${API_VERSION.v1}/${membersURL}/${signupURL}/check-email`,
    method: HTTP_METHOD.GET,
    params: { email },
  });
};

//아이디 중복체크
export const checkDuplicatedLoginId = async (loginId: string) => {
  return _axios<boolean>({
    url: `/${API_VERSION.v1}/${membersURL}/${signupURL}/check-id`,
    method: HTTP_METHOD.GET,
    params: { loginId },
  });
};

//이메일로 인증코드 보내기
export const sendAuthCodeToEmail = async (email: string) => {
  return _axios<boolean>({
    url: `/${API_VERSION.v1}/${membersURL}/${signupURL}/authcode`,
    method: HTTP_METHOD.GET,
    params: { email },
  });
};

//이메일 인증코드 확인
export const verifyEmailAuthCode = async (data: VerifyEmailAuthCodeDTO) => {
  return _axios<boolean>({
    url: `/${API_VERSION.v1}/${membersURL}/${signupURL}/authcode`,
    method: HTTP_METHOD.POST,
    data,
  });
};

// ----- 회원가입 관련 API ----->

// <----- 로그인 관련 API -----

export const login = async (data: LoginDTO) => {
  return _axios<{ memberInfo: User; tokenInfo: Tokens }>({
    url: `/${API_VERSION.v1}/${membersURL}/login`,
    method: HTTP_METHOD.POST,
    data,
  });
};

export const logout = async () => {
  return _axios<void>({
    url: `/${API_VERSION.v2}/${membersURL}/logout`,
    method: HTTP_METHOD.DELETE,
    headers: getJWTHeader(),
  });
};

export const tokenReissue = async (refreshToken: string) => {
  return _axios<Tokens>({
    url: `/${API_VERSION.v2}/${membersURL}/token/reissue`,
    method: HTTP_METHOD.POST,
    headers: { Authorization: refreshToken },
  });
};

export const userReissue = async () => {
  return _axios<User>({
    url: `/${API_VERSION.v1}/${membersURL}/reissue`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};

// ----- 로그인 관련 API ----->

export const fetchMemberComplexInfo = async () => {
  return _axios<MemberComplexInfo>({
    url: `/${API_VERSION.v2}/${membersURL}`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
  });
};
