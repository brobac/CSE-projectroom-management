import { useEffect } from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type KioskHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export const KioskHeader = ({ title, children }: KioskHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/kiosk/reservation") {
      const noticeToast = setTimeout(() => {
        toast.info("예약을 하지 않으면 30초 후에 메인으로 돌아갑니다", {
          position: "top-center",
          autoClose: 1000 * 30,
          pauseOnHover: false,
        });
      }, 1000 * 30);
      const toMain = setTimeout(() => navigate("/kiosk"), 1000 * 60);

      return () => {
        clearTimeout(noticeToast);
        clearTimeout(toMain);
      };
    }
  }, []);
  return (
    <header className=" fixed top-0 left-0 flex h-24 w-full items-center justify-center bg-base-100 bg-opacity-5 px-10 shadow-lg backdrop:blur">
      <div className=" absolute left-10">{children}</div>
      <span className="text-6xl font-bold text-white">{title}</span>
      <button
        onClick={() => navigate(-1)}
        className="btn-warning btn-lg btn absolute right-10 flex gap-2 text-white"
      >
        <BsArrowBarLeft />
        <span>뒤로가기</span>
      </button>
    </header>
  );
};
