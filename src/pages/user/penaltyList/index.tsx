import { useFetchPenaltyList } from "@services";
import { PenaltyDTO } from "@types";
import { Penalty } from "./_penalty";

const tempPenaltyList: PenaltyDTO[] = [
  {
    penaltyId: 6,
    startDt: "2022-11-24",
    endDt: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    penaltyId: 5,
    startDt: "2022-11-24",
    endDt: "2022-11-26",
    description: "미사용, 미반납 누적 3회",
  },
  {
    penaltyId: 4,
    startDt: "2022-11-24",
    endDt: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    penaltyId: 3,
    startDt: "2022-11-24",
    endDt: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    penaltyId: 2,
    startDt: "2022-11-24",
    endDt: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    penaltyId: 1,
    startDt: "2022-11-24",
    endDt: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    penaltyId: 0,
    startDt: "2022-11-24",
    endDt: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
];

export const MyPenaltyList = () => {
  const { data: penaltyList, isLoading } = useFetchPenaltyList();
  return (
    <div className="flex w-full min-w-[20rem] max-w-sm flex-col gap-4 overflow-x-hidden pt-8">
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold sm:text-2xl">제한 내역</p>
      </div>
      <div className="flex  flex-col gap-2 pb-8">
        {isLoading ? (
          <div className=""></div>
        ) : penaltyList ? (
          penaltyList.map((penalty) => (
            <Penalty key={penalty.penaltyId} {...penalty} />
          ))
        ) : (
          <div className="text-center text-gray-600">
            예약 제한 내역이 없습니다!
          </div>
        )}
      </div>
    </div>
  );
};
