import { RoomTable, RoomTableProps } from "./_roomTable";
import {
  chunkArray,
  isAfter,
  isBefore,
  isSameOrBefore,
  roundUp30MinuteIncrements,
} from "@utils";
import { useNavigate } from "react-router-dom";
import {
  kioskReservationTableState,
  reservationProjectRoomState,
  useReservationListState,
} from "@stores";
import dayjs from "dayjs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

export const KioskReservationPage = () => {
  const navigate = useNavigate();
  const [tableProps, setTableProps] = useState<RoomTableProps[]>([]);
  const { reservationList, isLoading } = useReservationListState();
  const reservationProjectroom = useRecoilValue(reservationProjectRoomState);
  const setKioskReservationState = useSetRecoilState(
    kioskReservationTableState,
  );

  //예약 내역을 받아와서 키오스크 테이블 선택화면에 필요한 형식으로 변환합니다
  const reservationListTransformToKioskTableProps = () => {
    const result: RoomTableProps[] = [];

    const now = new Date();
    const firstEndTime = roundUp30MinuteIncrements(now);
    reservationProjectroom?.projectTableList.forEach((table) => {
      const props: RoomTableProps = {
        projectTableId: table.tableId,
        tableName: table.tableName,
        availableTime: 0,
      };
      const afterReservationList = reservationList
        .filter((reservation) => reservation.projectTableId === table.tableId)
        .filter((reservation) => {
          if (reservation.returnedAt) {
            if (isBefore(reservation.returnedAt, now)) {
              return false;
            } else {
              return true;
            }
          } else {
            return isAfter(reservation.endAt, now);
          }
        });

      // 첫시간부터 막히면
      if (
        afterReservationList.some((reservation) =>
          isSameOrBefore(reservation.startAt, now),
        )
      ) {
        afterReservationList.sort(
          (a, b) =>
            new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
        );
        const remainingTime =
          (new Date(afterReservationList[0].endAt).getTime() - now.getTime()) /
          (1000 * 60);
        props.remainingTime = Math.ceil(remainingTime);
        props.disabled = true;
      } else {
        const availableEndTimeList = [];
        availableEndTimeList.push(firstEndTime);
        for (let i = 1; i < 8; i++) {
          const endTime = dayjs(firstEndTime)
            .add(i * 30, "minute")
            .toDate();

          if (
            afterReservationList.some((reservation) =>
              isBefore(reservation.startAt, endTime),
            )
          ) {
            break;
          } else {
            availableEndTimeList.push(endTime);
          }
        }

        const availableTime =
          (availableEndTimeList[availableEndTimeList.length - 1].getTime() -
            now.getTime()) /
          (1000 * 60);

        props.availableTime = Math.ceil(availableTime);
        props.availableTimelist = availableEndTimeList;
      }

      result.push(props);
    });
    return result;
  };

  const onClickTable = (tableProps: RoomTableProps) => {
    setKioskReservationState(tableProps);
    navigate("time-select");
  };

  useEffect(() => {
    const props = reservationListTransformToKioskTableProps();
    setTableProps(props);
  }, [reservationProjectroom, reservationList]);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {/* tailwind grid-rows-2 가 적용안되서 2줄로 분리 */}
      {chunkArray(tableProps, Math.ceil(tableProps.length / 2)).map(
        (tables, i) => (
          <div key={i} className="flex h-full w-full gap-4">
            {tables.map((table) => (
              <RoomTable
                key={table.projectTableId}
                {...table}
                onClick={() => onClickTable(table)}
              />
            ))}
          </div>
        ),
      )}
    </div>
  );
};
