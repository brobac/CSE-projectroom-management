import { useAdminLogin } from "@/services/react-query/admin/auth";
import { LoginDTO } from "@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export const AdminLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginDTO>();
  const { mutate: login, isLoading, isError, error } = useAdminLogin();

  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    login(data);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-200">
      <div className="flex w-full max-w-md items-center justify-center rounded-xl bg-base-100 p-10 shadow-md">
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="input-group w-full">
            <span className="w-16 text-center">ID</span>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              className="input-bordered input w-full"
              {...register("loginId", { required: true })}
            />
          </label>
          <label className="input-group">
            <span className="w-16">PW</span>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="input-bordered input w-full"
              {...register("password", { required: true })}
            />
          </label>
          <p className="text-center text-sm text-error">{error?.message}</p>
          <button
            disabled={!isValid}
            className={twMerge([
              "btn-primary btn mb-4 text-lg font-bold text-primary-content",
              isLoading && "loading",
            ])}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};
