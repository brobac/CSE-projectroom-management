import { useKioskReservation } from "@services";
import { useKioskReservationState } from "@stores";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";

export const KioskReservationResultModal = () => {
  const [countdown, setCountdown] = useState(5);
  const { state, isValid } = useKioskReservationState();

  const {
    mutate: reservationConfirm,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useKioskReservation();

  useEffect(() => {
    if (isValid) reservationConfirm(state!);
  }, [state]);

  useEffect(() => {
    if (isSuccess || isError) {
      const interval = setInterval(() => {
        if (countdown <= 0) clearInterval(interval);
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
  }, [isSuccess, isError]);

  return (
    <Modal type="modal-kiosk-reservation-result" closeButton>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          {isSuccess && (
            <div className="flex flex-col items-center gap-8">
              <p className="text-4xl font-bold text-primary">예약 완료</p>
              <p className="text-2xl font-bold">자리로 가서 이용해주세요</p>
              <p className="mt-4">{countdown}초 후에 창이 닫힙니다</p>
            </div>
          )}
          {isError && (
            <div className="flex flex-col items-center gap-8">
              <p className="text-5xl font-bold text-error">예약 실패</p>
              <p className="text-2xl font-bold">{error.message}</p>
              <p className="mt-4">{countdown}초 후에 창이 닫힙니다</p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
