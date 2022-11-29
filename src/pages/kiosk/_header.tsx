import { BsArrowBarLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const KioskHeader = () => {
  const navigate = useNavigate();
  return (
    <header className=" fixed top-0 left-0 flex h-24 w-full items-center justify-between bg-base-100 bg-opacity-5 px-10 shadow-lg backdrop:blur">
      <div></div>
      <span className="text-6xl font-bold text-white">D330</span>
      <button
        onClick={() => navigate(-1)}
        className=" btn-warning btn-lg btn flex gap-2 text-white"
      >
        <BsArrowBarLeft />
        <span>뒤로가기</span>
      </button>
    </header>
  );
};
