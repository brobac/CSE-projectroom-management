import { Link } from "react-router-dom";

export const History = () => {
  const reservationCount = 7;
  const penaltyCount = 1;
  return (
    <div className="flex w-full max-w-xs flex-col gap-2 pt-8">
      <p className="px-2 font-bold">사용정보</p>
      <div className="flex w-full gap-2 px-2">
        <div className="group grow p-4 shadow">
          <Link to="reservation-list" className="flex flex-col items-center ">
            <span className=" text-lg">예약</span>
            <span className="text-3xl font-bold group-hover:underline">
              {reservationCount}
            </span>
          </Link>
        </div>
        <div className=" group grow p-4 shadow">
          <Link to="penalty-list" className="flex flex-col items-center">
            <span className=" text-lg">제재</span>
            <span className="text-3xl font-bold group-hover:underline">
              {penaltyCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
