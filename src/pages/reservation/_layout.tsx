import { Footer, LoginModal, ReservationHeader } from "@components";

export const ReservationPageLayout = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <ReservationHeader />
      {children}
      <Footer />
      <LoginModal />
    </div>
  );
};
