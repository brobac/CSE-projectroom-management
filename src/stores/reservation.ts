import { getMinusOneDay, getPlusOneDay } from "@utils";
import { atom, useRecoilState } from "recoil";

export const selectedProjectroom = atom({
  key: "selectedProjectroom",
  default: "D330",
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
