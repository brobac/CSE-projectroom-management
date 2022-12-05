import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

import { useModal } from "@/hooks/useModal";
import { ReservationConfirmResultModal } from "@components/modals/ReservationConfirmResultModal";
import { APIResponse, reservationConfirmWithQR } from "@services";
import { CommonAPIError, ReservationConfirmWithQRRequestDTO } from "@types";

import { KioskHeader } from "../_header";
import { useSetRecoilState } from "recoil";
import { qrScanResultState } from "@stores";

export const ReservationConfirmPage = () => {
  const navigate = useNavigate();
  const setQrScanResult = useSetRecoilState(qrScanResultState);
  const { openModal } = useModal("modal-reservation-confirm-result");

  const cameraWrapRef = useRef<HTMLDivElement>(null);

  const onScanSuccess = useDebouncedCallback((result: string) => {
    setQrScanResult(result);
    navigate("/kiosk");
    cameraWrapRef.current?.remove();
    openModal();
  }, 300);

  return (
    <>
      <ReservationConfirmResultModal />
      <KioskHeader title="예약확인" />
      <div className="flex h-full w-full items-center justify-center pt-24">
        <div ref={cameraWrapRef} className=" w-full max-w-2xl">
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
      </div>
    </>
  );
};
