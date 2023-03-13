import { Header } from "@components";
import { useLogout } from "@services";
import { useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  "reservation-list": "예약 내역",
  "penalty-list": "제한 내역",
  return: "반납하기",
};

const getTitles = (path: string) => {
  const pathList = path.split("/").filter((v) => v !== "");
  if (pathList.length === 1) return "마이페이지";
  return titles[pathList[1]];
};

export const MyPageHeader = () => {
  const location = useLocation();

  return (
    <Header
      title={getTitles(location.pathname) ?? ""}
      leftItem={<ToReservation />}
      rightItem={<LogoutButton />}
    />
  );
};

const ToReservation = () => {
  return (
    <Link to="/" className="flex items-center gap-1 text-lg font-bold">
      <IoCalendarOutline />
      <span>예약</span>
    </Link>
  );
};

const LogoutButton = () => {
  const { mutate: logout } = useLogout();
  return (
    <button onClick={() => logout()} className="btn-ghost btn">
      로그아웃
    </button>
  );
};
