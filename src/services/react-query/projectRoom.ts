import { projectRoomListState, reservationProjectRoomState } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { fetchProjectRoomList } from "../api";
import { queryKeys } from "./queryKeys";

export const useFetchProjectRoom = () => {
  const setProjectRoomList = useSetRecoilState(projectRoomListState);
  const setReservationProjectroom = useSetRecoilState(
    reservationProjectRoomState,
  );
  const { data, isLoading } = useQuery(
    [queryKeys.projectRoom],
    fetchProjectRoomList,
    {
      onSuccess: (res) => {
        setProjectRoomList(res.result);
        setReservationProjectroom(res.result[0]);
      },
    },
  );

  return { data, isLoading };
};
