import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { QrReader } from "react-qr-reader";

import { DateValue, KioskReservationRequestDTO } from "@types";
import { toFullDateTime_SLASH, toHHMM } from "@utils";
import { KioskReservationResultModal } from "@components/modals/KioskReservationResultModal";
import { useModal } from "@/hooks/useModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { kioskReservationState, kioskReservationTableState } from "@stores";
import { useDebouncedCallback } from "use-debounce";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export const KioskReservationTimeSelectPage = () => {
  const [selectedEndTime, setSelectedEndTime] = useState<DateValue>();
  const [qrReaderOpen, setQrReaderOpen] = useState(false);
  const tableprops = useRecoilValue(kioskReservationTableState);
  const setKioskReservationState = useSetRecoilState(kioskReservationState);
  const navigate = useNavigate();
  const { openModal } = useModal("modal-kiosk-reservation-result");
  const cameraWrapRef = useRef<HTMLDivElement>(null);

  const onClickEndTime = (endTime: DateValue) => {
    setSelectedEndTime(endTime);
  };

  const onScanSuccess = useDebouncedCallback((result: string) => {
    const reservationState: KioskReservationRequestDTO = {
      startAt: toFullDateTime_SLASH(
        dayjs(tableprops?.availableTimelist![0])
          .subtract(30, "minute")
          .toDate(),
      ),
      endAt: toFullDateTime_SLASH(selectedEndTime!),
      projectTableId: tableprops?.projectTableId!,
      accountQRContents: result,
    };

    setKioskReservationState(reservationState);
    navigate("/kiosk");
    cameraWrapRef.current?.remove();
    openModal();
  }, 300);

  return (
    <div className="flex h-full w-full">
      <div className="flex w-1/2 flex-col items-center gap-16">
        <h3 className=" card-title text-5xl font-bold text-white">
          종료시간 선택
        </h3>
        <div className="grid grid-cols-2 gap-8">
          {tableprops?.availableTimelist?.map((time, i) => (
            <EndTimeButton
              key={i}
              onClick={() => onClickEndTime(time)}
              endTime={time}
              selected={selectedEndTime === time}
            />
          ))}
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
          <div className="w-full" ref={cameraWrapRef}>
            <QrReader
              constraints={{ facingMode: "user" }}
              onResult={(result, error) => {
                if (!!result) {
                  onScanSuccess(result.getText());
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              className="w-full rounded-3xl transition"
            />
          </div>
        )}
      </div>
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
