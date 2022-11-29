import { useLogin } from "@services";
import { LoginDTO } from "@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Modal } from "./Modal";

export const LoginModal = () => {
  return (
    <Modal type="modal-login" closeButton>
      <h3 className="mb-8 text-center text-3xl font-bold text-base-content">
        로그인
      </h3>
      <LoginForm />
    </Modal>
  );
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>();
  const { mutate: login, isLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    login(data);
  };

  return (
    <form
      className="flex w-4/5 flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="input-group w-full">
        <span className="w-16 text-center">ID</span>
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          className="input-bordered input w-full"
          {...register("loginId")}
        />
      </label>
      <label className="input-group">
        <span className="w-16">PW</span>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="input-bordered input w-full"
          {...register("password")}
        />
      </label>
      <button
        className={twMerge([
          "btn-primary btn mb-8 text-lg font-bold text-primary-content",
          isLoading && "loading",
        ])}
      >
        로그인
      </button>
    </form>
  );
};
