import { adminLogin } from "@/services/api/admin/auth";
import { APIResponse } from "@/services/axiosService";
import { storageService } from "@/services/storageService";
import { userState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { CommonAPIError, LoginDTO, Tokens, User } from "@types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

export const useAdminLogin = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation<
    APIResponse<{ memberInfo: User; tokenInfo: Tokens }>,
    CommonAPIError,
    LoginDTO
  >((data: LoginDTO) => adminLogin(data), {
    onSuccess: (res) => {
      const user = res.result.memberInfo;
      const token = res.result.tokenInfo;
      storageService.setStoredUser(user);
      storageService.setStoredToken(token);
      setUser(user);
      navigate("/admin/reservations");
    },
  });

  return { mutate, isLoading, isError, error };
};
