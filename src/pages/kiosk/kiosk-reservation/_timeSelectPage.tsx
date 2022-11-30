import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { QrReader } from "react-qr-reader";

import { DateValue } from "@types";
import { toHHMM } from "@utils";
import { KioskReservationResultModal } from "@components/modals/KioskReservationResultModal";
import { useModal } from "@/hooks/useModal";

export const KioskReservationTimeSelectPage = () => {
  const [selectedEndTime, setSelectedEndTime] = useState<DateValue>();
  const [qrReaderOpen, setQrReaderOpen] = useState(false);

  const { openModal } = useModal("modal-kiosk-reservation-result");

  const onClickEndTime = (endTime: DateValue) => {
    setSelectedEndTime(endTime);
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex w-1/2 flex-col items-center gap-16">
        <h3 className=" card-title text-5xl font-bold text-white">
          종료시간 선택
        </h3>
        <div className="grid grid-cols-2 gap-8">
          <EndTimeButton
            onClick={() => onClickEndTime("2022-02-02 12:00")}
            endTime={"2022-02-02 12:00"}
            selected={selectedEndTime === "2022-02-02 12:00"}
          />
          <EndTimeButton
            onClick={() => onClickEndTime("2022-02-02 12:30")}
            selected={selectedEndTime === "2022-02-02 12:30"}
            endTime={"2022-02-02 12:30"}
          />
        </div>
      </div>
      <div className="h-full border-4 border-base-100"></div>
      <div className="flex w-1/2 flex-col items-center justify-center pl-10">
        {!qrReaderOpen && (
          <button
            onClick={() => setQrReaderOpen(true)}
            disabled={selectedEndTime === undefined}
            className={twMerge([
              " btn-secondary btn h-24 w-96 text-4xl font-bold ",
              "disabled:bg-secondary disabled:text-secondary-content disabled:opacity-50",
            ])}
          >
            인증하고 예약하기
          </button>
        )}
        {qrReaderOpen && (
          <QrReader
            constraints={{ facingMode: "user" }}
            onResult={(result, error) => {
              if (!!result) {
                openModal();
              }

              if (!!error) {
                console.info(error);
              }
            }}
            className="w-full rounded-3xl transition"
          />
        )}
      </div>
      <KioskReservationResultModal />
    </div>
  );
};

type EndTimeButtonProps = {
  endTime: DateValue;
  selected?: boolean;
  onClick?: () => void;
};

const EndTimeButton = ({ endTime, selected, onClick }: EndTimeButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={twMerge([
        "flex h-24 w-72 cursor-pointer items-center justify-center rounded-2xl border-8 border-base-300 bg-base-100 text-base-content",
        selected &&
          "border-base-100 bg-primary text-base-100 ring-8 ring-primary",
      ])}
    >
      <span className="text-4xl font-bold">{toHHMM(endTime)}</span>
    </div>
  );
};
