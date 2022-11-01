import { useRecoilState } from "recoil";

import {
  ROOM_NAME_LIST,
  reservationProjectroomState,
} from "@/stores/reservation";

export const ProjectroomSelect = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(
    reservationProjectroomState,
  );
  const onClickButton = (roomName: typeof ROOM_NAME_LIST[number]) => {
    setSelectedRoom(roomName);
  };
  return (
    <div className="flex w-full justify-center gap-8">
      {ROOM_NAME_LIST.map((name, i) => (
        <div
          key={i}
          onClick={() => onClickButton(name)}
          className={[
            name === selectedRoom
              ? "btn-primary btn"
              : "btn-ghost btn border border-solid border-base-300",
          ].join(" ")}
        >
          {name}
        </div>
      ))}
    </div>
  );
};
