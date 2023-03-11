import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";
import {
  checkDuplicatedEmail,
  checkDuplicatedLoginId,
  sendAuthCodeToEmail,
  useSignup,
  verifyEmailAuthCode,
} from "@services";
import { useEffect, useState } from "react";

type SignupInputs = {
  name: string;
  email: string;
  loginId: string;
  password: string;
};

const emailRegex = /.+@kumoh.ac.kr$/;
const loginIdRegex = /^[0-9]{8}$/;

export const SignupPage = () => {
  const [authCode, setAuthCode] = useState("");
  const [authCodeSent, setAuthCodeSent] = useState(false);
  const [authCodeVerified, setAuthCodeVerified] = useState(false);
  const [authCodeVerifyMessage, setAuthCodeVerifyMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignupInputs>();
  const { mutate: signup, isLoading } = useSignup();
  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    signup(data);
  };

  const onChangeAuthCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
  };

  const onClickSendAuthCodeButton = () => {
    sendAuthCodeToEmail(getValues("email"));
    setAuthCodeSent(true);
  };

  const onClickVerifyAuthCodeButton = () => {
    verifyEmailAuthCode({ email: getValues("email"), code: authCode })
      .then(() => {
        setAuthCodeVerified(true);
        setAuthCodeVerifyMessage("인증되었습니다");
      })
      .catch((error) => setAuthCodeVerifyMessage(error.message));
  };

  const deboucedEmailCheck = useDebouncedCallback(async (email) => {
    if (!emailRegex.test(email)) {
      setError("email", { message: "금오공과대학교 메일을 사용해주세요" });
      return;
    }
    checkDuplicatedEmail(email)
      .then((res) => {
        clearErrors("email");
      })
      .catch((err) => {
        setError("email", { message: "이미 사용중인 이메일입니다." });
      });
  }, 1000);

  const debouncedLoginIdCheck = useDebouncedCallback(async (loginId) => {
    if (!loginIdRegex.test(loginId)) {
      setError("loginId", { message: "8자리 학번만 가능합니다" });
      return;
    }
    checkDuplicatedLoginId(loginId)
      .then(() => {
        console.log("사용가능한 아이디");
        clearErrors("loginId");
      })
      .catch((err) => {
        setError("loginId", { message: "이미 사용중인 아이디입니다." });
      });
  }, 1000);

  return (
    <div className="flex h-screen flex-col items-center justify-end  sm:justify-center">
      <div className="card w-full border border-base-200 bg-base-100 shadow-xl sm:max-w-lg">
        <div className="card-body">
          <h2 className=" card-title mb-8 self-center text-3xl">회원가입</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">이름</span>
                  <span className="text-error"></span>
                </div>
                <input
                  type="text"
                  placeholder="박형준"
                  className={twMerge([
                    "input w-full border border-base-300",
                    errors.name && "input-error bg-error-content",
                  ])}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "이름은 필수 입력입니다.",
                    },
                  })}
                />
                <span className="pl-2 text-sm text-error">
                  {errors.name?.message}
                </span>
              </label>
              <label className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold">이메일</span>
                  <span className="text-sm text-info">
                    금오공과대학교 이메일만 사용할 수 있습니다
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="user@kumoh.ac.kr"
                    className={twMerge([
                      "input w-full border border-base-300",
                      errors.email && "input-error bg-error-content",
                    ])}
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: emailRegex,
                        message: "메일 양식을 확인해주세요",
                      },
                      onChange: (e) => {
                        deboucedEmailCheck(e.target.value);
                        setAuthCodeSent(false);
                      },
                    })}
                  />
                  <button
                    type="button"
                    disabled={
                      !emailRegex.test(getValues("email")) ||
                      errors.hasOwnProperty("email")
                    }
                    onClick={onClickSendAuthCodeButton}
                    className="btn-primary btn"
                  >
                    인증코드 받기
                  </button>
                </div>
                <span className="pl-2 text-sm text-error">
                  {errors.email?.message}
                </span>
                {authCodeSent && (
                  <span className="pl-2 text-sm text-info">
                    인증코드가 발송되었습니다 3분안에 입력해주세요
                  </span>
                )}
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="인증코드"
                    onChange={(e) => onChangeAuthCode(e)}
                    className={twMerge(["input w-full border border-base-300"])}
                  />
                  <span
                    className={twMerge([
                      "pl-2 text-sm",
                      authCodeVerified ? "text-info" : "text-error",
                    ])}
                  >
                    {authCodeVerifyMessage}
                  </span>
                  <button
                    type="button"
                    onClick={onClickVerifyAuthCodeButton}
                    disabled={authCode === ""}
                    className="btn-primary btn w-full"
                  >
                    인증코드 확인
                  </button>
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold">아이디</span>
                  <span className="text-sm text-info">
                    아이디로는 학번이 사용됩니다
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="20215678"
                  className={twMerge([
                    "input w-full border border-base-300",
                    errors.loginId && "input-error bg-error-content",
                  ])}
                  {...register("loginId", {
                    required: true,
                    pattern: loginIdRegex,
                    onChange: (e) => debouncedLoginIdCheck(e.target.value),
                  })}
                />
                <span className="pl-2 text-sm text-error">
                  {errors.loginId?.message}
                </span>
              </label>
              <label className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold">비밀번호</span>
                  <span className="text-sm text-info">
                    {/* 8~16자리, 1개 이상의 특수문자 포함, 1개 이상의 영문자 포함 */}
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="비밀번호"
                  className={twMerge([
                    "input w-full border border-base-300",
                    errors.password && "input-error bg-error-content",
                  ])}
                  {...register("password", {
                    required: true,
                    // pattern:
                    //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[@#!~$%^&-+=()])(?=\\S+$).{8,16}$/,
                  })}
                />
              </label>
            </div>
            <button
              disabled={!isValid || !authCodeVerified}
              className={twMerge([
                "btn-primary btn mt-8 w-full",
                isLoading && "loading",
              ])}
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
