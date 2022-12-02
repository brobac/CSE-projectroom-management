import { useFetchPastReservationList } from "@services";
import { Reservation } from "./_reservation";

export const MyReservationList = () => {
  const { data, isLoading } = useFetchPastReservationList();

  if (isLoading) return <div></div>;

  return (
    <div className="flex w-full min-w-[20rem] max-w-sm flex-col gap-4 pt-8">
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold sm:text-2xl">예약 내역</p>
        {/* <p className=" flex gap-1 text-sm">
          <span>3개월</span>
          <span>·</span>
          <span>전체</span>
          <span>·</span>
          <span>최신순</span>
        </p> */}
      </div>
      <div className="flex flex-col gap-2 pb-8">
        {data?.map((reservation) => (
          <Reservation key={reservation.reservationId} {...reservation} />
        ))}
      </div>
    </div>
  );
};
