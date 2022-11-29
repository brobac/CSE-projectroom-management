import { useRecoilValue } from "recoil";
import { useModal } from "@/hooks/useModal";
import { reservationProjectroomState } from "@/stores/reservation";
import { useLogout } from "@services";
import { useUserState } from "@/stores/user";
import { useNavigate } from "react-router-dom";

export const ReservationHeader = () => {
  const roomName = useRecoilValue(reservationProjectroomState);
  const { hasAuth } = useUserState();
  return (
    <Header
      title={roomName}
      rightItem={hasAuth ? <MyPageButton /> : <LoginButton />}
    />
  );
};

const LoginButton = () => {
  const { openModal } = useModal("modal-login");
  return (
    <button onClick={openModal} className="btn-ghost btn">
      로그인
    </button>
  );
};

const MyPageButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/mypage")} className="btn-ghost btn">
      MY
    </button>
  );
};

type HeaderProps = {
  title: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
};

export const Header = ({ title, leftItem, rightItem }: HeaderProps) => {
  return (
    <header className="fixed top-0 z-10 flex w-full min-w-[22rem] justify-center bg-base-100 px-4 shadow">
      <div className="navbar  max-w-screen-2xl">
        <div className="navbar-start">{leftItem}</div>
        <div className="navbar-center">
          <h1 className="font text-2xl font-bold text-base-content">{title}</h1>
        </div>
        <div className="navbar-end">{rightItem}</div>
      </div>
    </header>
  );
};
