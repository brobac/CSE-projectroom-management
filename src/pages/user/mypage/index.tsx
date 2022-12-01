import { useFetchCurrentReservationList } from "@services";
import { History } from "./_history";
import { PenaltyInfo } from "./_penaltyInfo";
import { QRSection } from "./_qrSection";
import { CurrentReservation } from "./_reservationInfo";

export const MyPage = () => {
  const { data: currentReservationList, isLoading } =
    useFetchCurrentReservationList();

  if (isLoading) return <div>로딩중</div>;

  return (
    <>
      <PenaltyInfo />
      {/* <----- 진행중인 예약 -----> */}
      <div className="flex w-full flex-col items-center gap-4 pt-4">
        <p className="text-2xl font-bold">진행중인 예약</p>
        <div className="flex w-full max-w-xs flex-col gap-2">
          {currentReservationList!.map((reservation) => (
            <CurrentReservation
              key={reservation.reservationId}
              {...reservation}
            />
          ))}
        </div>
      </div>
      {/* <----- 진행중인 예약 -----> */}
      <History />
      <QRSection />
    </>
  );
};
