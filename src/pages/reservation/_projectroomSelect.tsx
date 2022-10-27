import {
  ROOM_NAME_LIST,
  reservationProjectroomState,
} from "@/stores/reservation";
import { useRecoilState } from "recoil";

export const ProjectroomSelect = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(
    reservationProjectroomState,
  );
  const onClickButton = (roomName: string) => {
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
              ? "btn btn-primary"
              : "btn btn-ghost border border-solid border-base-300",
          ].join(" ")}
        >
          {name}
        </div>
      ))}
    </div>
  );
};
