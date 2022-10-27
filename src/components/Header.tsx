import { useModal } from "@/hooks/useModal";
import { reservationProjectroomState } from "@/stores/reservation";
import { useRecoilValue } from "recoil";
import { MODAL_TYPE } from "./modals";

export const ReservationHeader = () => {
  const roomName = useRecoilValue(reservationProjectroomState);
  return <Header title={roomName} rightItem={<LoginButton />} />;
};

const LoginButton = () => {
  const { openModal } = useModal("modal-login");
  return (
    <button onClick={openModal} className="btn btn-ghost">
      로그인
    </button>
  );
};

type HeaderProps = {
  title: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
};

const Header = ({ title, leftItem, rightItem }: HeaderProps) => {
  return (
    <div className="navbar fixed top-0 bg-base-100  px-4 shadow">
      <div className="navbar-start">{leftItem}</div>
      <div className="navbar-center">
        <h1 className="font text-2xl font-bold text-base-content">{title}</h1>
      </div>
      <div className="navbar-end">{rightItem}</div>
    </div>
  );
};
