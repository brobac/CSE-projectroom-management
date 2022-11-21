import { PenaltyDTO } from "@types";
import { toYYYYMD_DOT, toYYYYMD_KO_DAY_DOT } from "@utils";
import { twMerge } from "tailwind-merge";

export const Penalty = ({
  id,
  userId,
  startDate,
  endDate,
  description,
}: PenaltyDTO) => {
  return (
    <div className=" w-full overflow-hidden border border-base-300 bg-base-100 text-sm  sm:text-base">
      <div className="flex w-full flex-col divide-y-[1px] divide-base-300">
        <div className="flex items-center divide-x-[1px] divide-base-300">
          <span className=" whitespace-nowrap p-4 text-center font-bold">
            기간
          </span>
          <span className="px-4">{`${toYYYYMD_DOT(startDate)} ~ ${toYYYYMD_DOT(
            endDate,
          )}`}</span>
        </div>
        <div className="flex items-center divide-x-[1px] divide-base-300">
          <span className="h-full whitespace-nowrap p-4 text-center font-bold">
            사유
          </span>
          <span className=" break-words px-4">{description}</span>
        </div>
      </div>
    </div>
  );
};
