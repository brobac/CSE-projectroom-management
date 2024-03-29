import { queryKeys } from "@/services/react-query/queryKeys";
import { fetchMemberComplexInfo } from "@services";
import { useQuery } from "@tanstack/react-query";
import { MemberComplexInfo } from "@types";
import { atom, useRecoilState } from "recoil";
import { useUserState } from "./user";

export const memberComplexInfoState = atom<MemberComplexInfo>({
  key: "memberComplexInfoState",
  default: {
    pastReservationCount: 0,
    penaltyCount: 0,
    penaltyInfo: null,
    qrImage: null,
    violationCount: 0,
  },
});

export const useMemberComplexInfoState = () => {
  const [memberComplexInfo, setMemberComplexInfo] = useRecoilState(
    memberComplexInfoState,
  );
  const { hasAuth } = useUserState();

  const { isLoading } = useQuery(
    [queryKeys.reservation, queryKeys.user],
    () => fetchMemberComplexInfo(),
    {
      enabled: hasAuth,
      onSuccess: (res) => {
        setMemberComplexInfo(res.result);
      },
    },
  );

  return { memberComplexInfo, isLoading };
};
