import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();

  const toMainPage = () => navigate("/");

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-800">
      <div className="flex w-full max-w-lg flex-col items-center p-4">
        <h1 className=" whitespace-nowrap text-4xl font-bold text-base-100 lg:text-5xl">
          Page Not Found
        </h1>
        <img
          src="../images/404Error.png"
          alt="404 error"
          className="w-full object-contain"
        />
        <button
          onClick={toMainPage}
          className=" btn-primary btn-wide btn text-base-100 lg:text-xl"
        >
          메인페이지로
        </button>
      </div>
    </div>
  );
};
