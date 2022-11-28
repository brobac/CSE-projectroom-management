import { SignupDTO } from "@types";

import { HTTP_METHOD } from ".";
import { _axios } from "../axiosService";

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
    url: `${membersURL}duplicated-loginId`,
    method: HTTP_METHOD.GET,
    params: { loginId },
  });
};

// ----- 회원가입 관련 API ----->
