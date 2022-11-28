import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { SignupDTO } from "@types";
import {
  checkDuplicatedEmail,
  checkDuplicatedLoginId,
  signup,
} from "@services";

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
