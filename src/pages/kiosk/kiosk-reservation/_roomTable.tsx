import { twMerge } from "tailwind-merge";

type RoomTableProps = {
  id: number;
  name: string;
  availableTime: number;
  remainingTime?: number;
  disabled?: boolean;
  onClick?: () => void;
};

export const RoomTable = ({
  id,
  name,
  availableTime,
  remainingTime,
  disabled,
  onClick,
}: RoomTableProps) => {
  const minutesToHoursMins = (minutes: number) => {
    const hour = Math.floor(minutes / 60);
    const miniute = minutes % 60;
    return { hour, miniute };
  };

  const getAvailableTimeAnnouncement = ({
    hour,
    miniute,
  }: {
    hour: number;
    miniute: number;
  }) => {
    if (hour === 0) return `최대 ${miniute}분`;
    return `최대 ${hour}시간 ${miniute}분`;
  };

  const getRemainingTimeAnnouncement = ({
    hour,
    miniute,
  }: {
    hour: number;
    miniute: number;
  }) => {
    if (hour === 0) return `${miniute}분 후 가능`;
    return `${hour}시간 ${miniute}분 후 가능`;
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge([
        "h-full flex-1 rounded-xl bg-primary",
        disabled && "bg-secondary",
      ])}
    >
      <div className="relative flex h-full flex-col items-center justify-center">
        {disabled ? (
          <p className="text-5xl font-bold text-white">
            {getRemainingTimeAnnouncement(minutesToHoursMins(remainingTime!))}
          </p>
        ) : (
          <p className="text-5xl font-bold text-white">
            {getAvailableTimeAnnouncement(minutesToHoursMins(availableTime))}
          </p>
        )}
        <p className=" absolute bottom-10 text-5xl font-bold text-white">
          {name}
        </p>
      </div>
    </button>
  );
};
