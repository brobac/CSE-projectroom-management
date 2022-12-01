import { useQuery } from "@tanstack/react-query";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

import { fetchProjectRoomList } from "@services";
import { queryKeys } from "@/services/react-query/queryKeys";
import { ProjectRoom } from "@types";

import { reservationProjectRoomState } from "./reservation";

export const projectRoomListState = atom<ProjectRoom[]>({
  key: "projectRoomListState",
  default: [],
});

export const useProjectRoomListState = () => {
  const [projectRoomList, setProjectRoomList] =
    useRecoilState(projectRoomListState);
  const setReservationProjectroom = useSetRecoilState(
    reservationProjectRoomState,
  );

  const { isLoading } = useQuery(
    [queryKeys.projectRoom],
    fetchProjectRoomList,
    {
      onSuccess: (res) => {
        setProjectRoomList(res.result);
        setReservationProjectroom(res.result[0]);
      },
      staleTime: 600000,
      cacheTime: 120000,
    },
  );

  return { projectRoomList, isLoading };
};
