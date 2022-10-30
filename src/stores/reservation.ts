import { getMinusOneDay, getPlusOneDay } from "@utils";
import { atom, useRecoilState } from "recoil";

export const ROOM_NAME_LIST = ["D330", "DB134"] as const;

export const TABLE_INFO = {
  D330: ["1", "2", "3", "4", "5", "6"],
  DB134: ["1", "2", "3", "4", "5", "6", "7", "8"],
};

export const reservationProjectroomState = atom<typeof ROOM_NAME_LIST[number]>({
  key: "reservationProjectroomState",
  default: ROOM_NAME_LIST[0],
});

export const reservationDateState = atom({
  key: "reservationDateState",
  default: new Date(),
});

export const useReservationDateState = () => {
  const [state, setState] = useRecoilState(reservationDateState);

  const minusOneDay = () => {
    setState(getMinusOneDay(state));
  };

  const plusOneDay = () => {
    setState(getPlusOneDay(state));
  };

  return {
    state,
    setState,
    minusOneDay,
    plusOneDay,
  };
};
