import { Footer, LoginModal, ReservationHeader } from "@components";

export const ReservationPageLayout = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen flex-col pt-16">
      <ReservationHeader />
      {children}
      <Footer />
      <LoginModal />
    </div>
  );
};
