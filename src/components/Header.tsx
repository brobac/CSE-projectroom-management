export const ReservationHeader = () => {
  return <Header title="D330" rightItem={<LoginButton />} />;
};

const LoginButton = () => {
  return (
    <label htmlFor="modal-login" className="modal-button btn-ghost btn">
      로그인
    </label>
  );
};

type HeaderProps = {
  title: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
};

const Header = ({ title, leftItem, rightItem }: HeaderProps) => {
  return (
    <div className="navbar fixed max-w-7xl bg-base-100  px-4 shadow">
      <div className="navbar-start">{leftItem}</div>
      <div className="navbar-center">
        <h1 className="font text-2xl font-bold text-base-content">{title}</h1>
      </div>
      <div className="navbar-end">{rightItem}</div>
    </div>
  );
};
