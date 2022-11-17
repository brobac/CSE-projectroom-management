import { Header } from "@components";
import { IoCalendarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const MyPageHeader = () => {
  return (
    <Header
      title="마이페이지"
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
  return <button>로그아웃</button>;
};
