import { Header } from "@components";
import { useLogout } from "@services";
import { useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  "/mypage": "마이페이지",
  "/mypage/reservation-list": "예약 내역",
  "/mypage/penalty-list": "제한 내역",
  "/mypage/return": "반납하기",
};

export const MyPageHeader = () => {
  const location = useLocation();

  useEffect(() => console.log(location), [location]);
  return (
    <Header
      title={titles[location.pathname] ?? ""}
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
