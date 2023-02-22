import { useFetchCurrentReservationList } from "@services";
import { Link } from "react-router-dom";
import { History } from "./_history";
import { PenaltyInfo } from "./_penaltyInfo";
import { QRSection } from "./_qrSection";
import { CurrentReservation } from "./_reservationInfo";

export const MyPage = () => {
  const { data: currentReservationList, isLoading } =
    useFetchCurrentReservationList();

  return (
    <>
      <PenaltyInfo />
      {/* <----- 진행중인 예약 -----> */}
      <div className="flex h-full w-full flex-col items-center gap-4 pt-4">
        <p className="text-2xl font-bold">진행중인 예약</p>
        <div className="flex w-full max-w-xs flex-col items-center gap-2">
          {isLoading ? (
            <CurrentReservationSkeleton />
          ) : currentReservationList!.length > 0 ? (
            currentReservationList?.map((reservation) => (
              <CurrentReservation
                key={reservation.reservationId}
                {...reservation}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-gray-500">진행중인 예약이 없습니다!</p>
              <Link to="/" className="text-primary hover:underline">
                예약하러가기
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* <----- 진행중인 예약 -----> */}
      <History />
      <QRSection />
    </>
  );
};

const CurrentReservationSkeleton = () => {
  return <div className=" h-20 w-full max-w-xs rounded-2xl bg-gray-200"></div>;
};
