import { MODAL_TYPE } from ".";

export const LoginModal = () => {
  return (
    <>
      <input type="checkbox" id={MODAL_TYPE.LOGIN} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="align-center modal-box relative flex flex-col items-center">
          <label
            htmlFor={MODAL_TYPE.LOGIN}
            className=" btn-outline btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="mb-8 text-center text-3xl font-bold text-base-content">
            로그인
          </h3>
          <LoginForm />
        </div>
      </div>
    </>
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
