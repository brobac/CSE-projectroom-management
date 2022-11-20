import { ReservationHeader } from "@components";

export const ReservationPageLayout = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col pt-16">
      <ReservationHeader />
      {children}
    </div>
  );
};
