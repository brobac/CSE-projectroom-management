import { useRecoilValue } from "recoil";
import { useModal } from "@/hooks/useModal";
import { reservationProjectroomState } from "@/stores/reservation";

export const ReservationHeader = () => {
  const roomName = useRecoilValue(reservationProjectroomState);
  return <Header title={roomName} rightItem={<LoginButton />} />;
};

const LoginButton = () => {
  const { openModal } = useModal("modal-login");
  return (
    <button onClick={openModal} className="btn-ghost btn">
      로그인
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
    <header className="fixed top-0 flex w-full justify-center bg-base-100 px-4 shadow">
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
