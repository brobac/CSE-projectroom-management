import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { LoginDTO, LogoutDTO, SignupDTO } from "@types";
import {
  checkDuplicatedEmail,
  checkDuplicatedLoginId,
  signup,
  login,
  logout,
} from "@services";

// <----- 회원가입 관련 -----

export const useSignup = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation((data: SignupDTO) => signup(data), {
    onSuccess: () => {
      navigate("/");
    },
  });

  return { mutate, isLoading };
};

const emailRegex = /.+@kumoh.ac.kr$/;
export const useCheckDuplicatedEmail = (email: string) => {
  const { data, isLoading } = useQuery(
    ["check-email-duplicated"],
    () => {
      checkDuplicatedEmail(email);
    },
    { enabled: emailRegex.test(email) },
  );

  return { data, isLoading };
};

export const useCheckDuplicatedLoginId = () => {
  const { mutate } = useMutation((loginId: string) =>
    checkDuplicatedLoginId(loginId),
  );

  return mutate;
};

// ----- 회원가입 관련 ----->

// <----- 로그인 관련 -----

export const useLogin = () => {
  const { mutate } = useMutation((data: LoginDTO) => login(data));

  return { mutate };
};

export const useLogout = () => {
  const { mutate } = useMutation((data: LogoutDTO) => logout(data));

  return { mutate };
};

// ----- 로그인 관련 ----->
