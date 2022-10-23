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
  return (
    <form className="flex w-4/5 flex-col gap-4">
      <label className="input-group w-full">
        <span className="w-16 text-center">ID</span>
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          className="input-bordered input w-full"
        />
      </label>
      <label className="input-group">
        <span className="w-16">PW</span>
        <input
          type="text"
          placeholder="비밀번호를 입력해주세요"
          className="input-bordered input w-full"
        />
      </label>
      <button className="btn-primary btn mb-8 text-lg font-bold text-primary-content">
        로그인
      </button>
    </form>
  );
};
