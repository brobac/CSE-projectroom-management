import { useMemberComplexInfoState } from "@/stores/member";
import { Link } from "react-router-dom";

export const History = () => {
  const { memberComplexInfo } = useMemberComplexInfoState();

  return (
    <div className="flex w-full max-w-xs flex-col gap-2 pt-8">
      <p className="px-2 text-center text-lg font-bold">사용정보</p>
      <div className="flex w-full gap-2">
        <div className="group w-1/2 p-4 shadow">
          <Link to="reservation-list" className="flex flex-col items-center ">
            <span className=" text-lg">예약</span>
            <span className="text-3xl font-bold group-hover:underline">
              {memberComplexInfo.pastReservationCount}
            </span>
          </Link>
        </div>
        <div className=" group w-1/2 p-4 shadow">
          <Link to="penalty-list" className="flex flex-col items-center">
            <span className=" text-lg">예약 제한</span>
            <span className="text-3xl font-bold group-hover:underline">0</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
