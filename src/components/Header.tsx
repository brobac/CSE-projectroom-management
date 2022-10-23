import { useModal } from "@/hooks/useModal";
import { MODAL_TYPE } from "./modals";

export const ReservationHeader = () => {
  return <Header title="D330" rightItem={<LoginButton />} />;
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
