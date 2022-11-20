import { Outlet } from "react-router-dom";
import { MyPageHeader } from "./mypage/_header";

export const MyPageLayout = () => {
  return (
    <>
      <MyPageHeader />
      <div className="flex w-full max-w-screen-2xl flex-col items-center px-4 pt-16">
        <Outlet />
      </div>
    </>
  );
};
