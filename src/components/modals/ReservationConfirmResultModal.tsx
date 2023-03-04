import { useReservationConfirmWithQR } from "@services";
import { qrScanResultState } from "@stores";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Modal } from "./Modal";

const errorMessages: Record<string, string> = {
  "0316": "유효하지 않은 QR코드 입니다",
  "0317": "시작시간 10분 전부터 확인이 가능합니다",
  "0318": "만료된 QR코드 입니다",
  "0319": "이전 팀이 사용중입니다 잠시만 기다려주세요",
};

export const ReservationConfirmResultModal = () => {
  const qrScanResult = useRecoilValue(qrScanResultState);
  const [countdown, setCountdown] = useState(5);

  const {
    mutate: reservationConfirm,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useReservationConfirmWithQR();

  useEffect(() => {
    if (qrScanResult !== "") reservationConfirm({ qrContent: qrScanResult });
  }, [qrScanResult]);

  useEffect(() => {
    if (isSuccess || isError) {
      const interval = setInterval(() => {
        if (countdown <= 0) clearInterval(interval);
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
  }, [isSuccess, isError]);

  return (
    <Modal
      type="modal-reservation-confirm-result"
      onClose={() => window.location.reload()}
      closeButton
    >
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          {isSuccess && (
            <div className="flex flex-col items-center gap-8">
              <p className="text-4xl font-bold text-primary">예약 확인 완료</p>
              <p className="text-2xl font-bold">자리로 가서 이용해주세요</p>
              <p className="mt-4">{countdown}초 후에 창이 닫힙니다</p>
            </div>
          )}
          {isError && (
            <div className="flex flex-col items-center gap-8">
              <p className="text-5xl font-bold text-error">예약 확인 실패</p>
              <p className="text-2xl font-bold">{errorMessages[error.code]}</p>
              <p className="mt-4">{countdown}초 후에 창이 닫힙니다</p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
