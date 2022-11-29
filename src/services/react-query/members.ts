import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { LoginDTO, SignupDTO } from "@types";
import {
  checkDuplicatedEmail,
  checkDuplicatedLoginId,
  signup,
  login,
  logout,
} from "@services";
import { storageService } from "../storageService";
import { useModal } from "@/hooks/useModal";
import { useSetRecoilState } from "recoil";
import { userState } from "@/stores/user";

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
  const setUser = useSetRecoilState(userState);
  const { closeModal } = useModal("modal-login");

  const { mutate, isLoading, isError } = useMutation(
    (data: LoginDTO) => login(data),
    {
      onSuccess: (res) => {
        const user = res.result.memberInfo;
        const token = res.result.tokenInfo;
        storageService.setStoredUser(user);
        storageService.setStoredToken(token);
        setUser(user);
        closeModal();
      },
    },
  );

  return { mutate, isLoading, isError };
};

export const useLogout = () => {
  const setUser = useSetRecoilState(userState);
  const token = storageService.getStoredToken();

  const navigate = useNavigate();
  const { mutate } = useMutation(() => logout(token!), {
    onSuccess: () => {
      storageService.clearStoredToken();
      storageService.clearStoredUser();
      setUser(undefined);
      navigate("/");
    },
    onError: () => {
      storageService.clearStoredToken();
      storageService.clearStoredUser();
      setUser(undefined);
      navigate("/");
    },
  });

  return { mutate };
};

// ----- 로그인 관련 ----->
