import { BsArrowBarLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type KioskHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export const KioskHeader = ({ title, children }: KioskHeaderProps) => {
  const navigate = useNavigate();
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
