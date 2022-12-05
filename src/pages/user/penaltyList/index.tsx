import { PenaltyDTO } from "@types";
import { Penalty } from "./_penalty";

const tempPenaltyList: PenaltyDTO[] = [
  {
    id: 1,
    userId: 1,
    startDate: "2022-11-24",
    endDate: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    id: 2,
    userId: 1,
    startDate: "2022-11-24",
    endDate: "2022-11-26",
    description: "미사용, 미반납 누적 3회",
  },
  {
    id: 3,
    userId: 1,
    startDate: "2022-11-24",
    endDate: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    id: 4,
    userId: 1,
    startDate: "2022-11-24",
    endDate: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    id: 5,
    userId: 1,
    startDate: "2022-11-24",
    endDate: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    id: 6,
    userId: 1,
    startDate: "2022-11-24",
    endDate: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
  {
    id: 7,
    userId: 1,
    startDate: "2022-11-24",
    endDate: "2022-11-26",
    description: "미사용,미반납 누적 3회",
  },
];

export const MyPenaltyList = () => {
  return (
    <div className="flex w-full min-w-[20rem] max-w-sm flex-col gap-4 overflow-x-hidden pt-8">
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold sm:text-2xl">예약 제한 내역</p>
      </div>
      <div className="flex  flex-col gap-2 pb-8">
        {/* {tempPenaltyList.map((penalty) => (
          <Penalty key={penalty.id} {...penalty} />
        ))} */}
      </div>
    </div>
  );
};
