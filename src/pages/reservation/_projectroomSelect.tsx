import { useRecoilState } from "recoil";

import {
  reservationProjectRoomState,
  useReservationListState,
} from "@/stores/reservation";
import { ProjectRoom } from "@types";
import { useProjectRoomListState } from "@stores";
import { twMerge } from "tailwind-merge";

export const ProjectroomSelect = () => {
  const { projectRoomList, isLoading } = useProjectRoomListState();
  useReservationListState();
  const [selectedRoom, setSelectedRoom] = useRecoilState(
    reservationProjectRoomState,
  );

  const onClickButton = (room: ProjectRoom) => {
    setSelectedRoom(room);
  };

  if (isLoading) return <ProjectRoomSkeleton />;

  return (
    <div className="flex w-full justify-center gap-8">
      {projectRoomList.map((room) => (
        <div
          key={room.projectRoomId}
          onClick={() => onClickButton(room)}
          className={twMerge([
            "btn w-20 border border-solid border-base-300",
            room.projectRoomId === selectedRoom?.projectRoomId
              ? "btn-primary"
              : "btn-ghost",
          ])}
        >
          {room.roomName}
        </div>
      ))}
    </div>
  );
};

const ProjectRoomSkeleton = () => {
  return (
    <div className="flex w-full justify-center gap-8">
      <div className="h-12 w-20 rounded-lg border-none bg-base-200"></div>
      <div className="h-12 w-20 rounded-lg border-none bg-base-200"> </div>
    </div>
  );
};
