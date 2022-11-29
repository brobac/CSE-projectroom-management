import { RoomTable } from "./_roomTable";
import { chunkArray } from "@utils";
import { useNavigate } from "react-router-dom";

const tempTables = [
  { id: 1, name: "A1", availableTime: 180 },
  { id: 2, name: "A2", availableTime: 190 },
  { id: 3, name: "A3", availableTime: 0, remainingTime: 57, disabled: true },
  { id: 4, name: "A4", availableTime: 0, remainingTime: 157, disabled: true },
  { id: 5, name: "B1", availableTime: 214 },
  { id: 6, name: "B2", availableTime: 44 },
];

export const KioskReservationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {/* tailwind grid-rows-2 가 적용안되서 2줄로 분리 */}
      {chunkArray(tempTables, Math.ceil(tempTables.length / 2)).map(
        (tables) => (
          <div className="flex h-full w-full gap-4">
            {tables.map((table) => (
              <RoomTable
                key={table.id}
                {...table}
                onClick={() => navigate("time-select")}
              />
            ))}
          </div>
        ),
      )}
    </div>
  );
};
