import { useMemberComplexInfoState } from "@/stores/member";
import { useUserState } from "@stores";
import { toYYYYMD_KO_DAY_DOT } from "@utils";

export const PenaltyInfo = () => {
  const { user } = useUserState();
  const { memberComplexInfo } = useMemberComplexInfoState();

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4 pt-4">
      <p className="text-2xl font-bold">{user?.name}님</p>
      {/* <----- 제재관련 -----> */}
      <div className="flex w-full flex-col items-center">
        <p className=" text-xs">
          미반납 + 미사용
          <strong className="text-error"> 3회 </strong>
          마다
          <strong className="text-error"> 3일간 </strong>
          예약이 제한됩니다.
        </p>
        <div className="rounded-box flex w-full max-w-xs divide-x divide-base-200 overflow-hidden border border-base-300 bg-base-100">
          <div className="flex flex-col items-center p-4">
            <span className="whitespace-nowrap font-bold">미반납 + 미사용</span>
            <span className="flex grow items-center text-2xl font-bold text-error">
              {memberComplexInfo.violationCount}회
            </span>
          </div>
          <div className="flex  w-full max-w-xs flex-col items-center p-4">
            <span className="font-bold">예약 제한</span>
            {!memberComplexInfo.penaltyInfo ? (
              <span>없습니다</span>
            ) : (
              <p className="flex flex-col items-center">
                <span>
                  {toYYYYMD_KO_DAY_DOT(memberComplexInfo.penaltyInfo.startDt)}
                </span>
                <span>~</span>
                <span>
                  {toYYYYMD_KO_DAY_DOT(memberComplexInfo.penaltyInfo.endDt)}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
