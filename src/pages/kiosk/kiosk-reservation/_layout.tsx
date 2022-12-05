import { reservationProjectRoomState, useProjectRoomListState } from "@stores";
import { ProjectRoom } from "@types";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { KioskHeader } from "../_header";

export const KioskReservationLayout = () => {
  const { projectRoomList } = useProjectRoomListState();
  const [unSelectedProjectRoom, setUnSelectedProjectRoom] =
    useState<ProjectRoom>();
  const [reservationProjectRoom, setReservationProjectRoom] = useRecoilState(
    reservationProjectRoomState,
  );

  const onClickotherRoom = () => {
    setReservationProjectRoom(unSelectedProjectRoom);
  };

  useEffect(() => {
    const room = projectRoomList.find(
      (projectroom) =>
        projectroom.projectRoomId !== reservationProjectRoom?.projectRoomId,
    );
    console.log(room);
    setUnSelectedProjectRoom(room);
  }, [projectRoomList, reservationProjectRoom]);

  return (
    <>
      <KioskHeader title={reservationProjectRoom?.roomName!}>
        <button
          onClick={onClickotherRoom}
          className="btn-warning btn-lg btn text-2xl font-bold text-base-100"
        >
          {unSelectedProjectRoom?.roomName}
        </button>
      </KioskHeader>
      <div className="h-full w-full pt-24">
        <Outlet />
      </div>
    </>
  );
};
