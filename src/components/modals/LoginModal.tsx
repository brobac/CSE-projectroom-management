import { useModal } from "@/hooks/useModal";
import { useLogin } from "@services";
import { LoginDTO } from "@types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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
  const { mutate: login, isLoading, isError, error } = useLogin();

  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    login(data);
  };

  const { closeModal } = useModal("modal-login");

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
      {isError && (
        <p className="text-center text-sm text-error">
          아이디와 비밀번호를 확인해주세요
        </p>
      )}
      <button
        className={twMerge([
          "btn-primary btn mb-4 text-lg font-bold text-primary-content",
          isLoading && "loading",
        ])}
      >
        로그인
      </button>
      <p className="flex w-full justify-center gap-4">
        <span>회원이 아니신가요?</span>
        <Link
          onClick={closeModal}
          to={"/signup"}
          className="text-primary hover:underline"
        >
          회원가입
        </Link>
      </p>
    </form>
  );
};
