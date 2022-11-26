import { Reservation, ReservationProps } from "./_reservation";

const tempReservationList: ReservationProps[] = [
  {
    id: 1,
    reservationDate: "2022-11-24",
    startDateTime: "2022-11-24 11:00",
    endDateTime: "2022-11-24 13:00",
    projectroom: "D330",
    table: "A1",
    reservationState: "반납 대기중",
  },
  {
    id: 2,
    reservationDate: "2022-11-24",
    startDateTime: "2022-11-24 11:00",
    endDateTime: "2022-11-24 13:00",
    projectroom: "D330",
    table: "A1",
    reservationState: "예약완료",
  },
  {
    id: 3,
    reservationDate: "2022-11-24",
    startDateTime: "2022-11-24 11:00",
    endDateTime: "2022-11-24 13:00",
    projectroom: "D330",
    table: "A1",
    reservationState: "미사용",
  },
  {
    id: 3,
    reservationDate: "2022-11-24",
    startDateTime: "2022-11-24 11:00",
    endDateTime: "2022-11-24 13:00",
    projectroom: "D330",
    table: "A1",
    reservationState: "미반납",
  },
  {
    id: 3,
    reservationDate: "2022-11-24",
    startDateTime: "2022-11-24 11:00",
    endDateTime: "2022-11-24 13:00",
    projectroom: "D330",
    table: "A1",
    reservationState: "취소됨",
  },
  {
    id: 3,
    reservationDate: "2022-11-24",
    startDateTime: "2022-11-24 11:00",
    endDateTime: "2022-11-24 13:00",
    projectroom: "D330",
    table: "A1",
    reservationState: "반납 완료",
  },
];

export const MyReservationList = () => {
  return (
    <div className="flex w-full min-w-[20rem] max-w-sm flex-col gap-4 pt-8">
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold sm:text-2xl">예약 내역</p>
        <p className=" flex gap-1 text-sm">
          <span>3개월</span>
          <span>·</span>
          <span>전체</span>
          <span>·</span>
          <span>최신순</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {tempReservationList.map((reservation) => (
          <Reservation key={reservation.id} {...reservation} />
        ))}
      </div>
    </div>
  );
};
