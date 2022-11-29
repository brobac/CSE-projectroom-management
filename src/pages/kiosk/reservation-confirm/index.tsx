import { useModal } from "@/hooks/useModal";
import { ReservationConfirmResultModal } from "@components/modals/ReservationConfirmResultModal";
import { QrReader } from "react-qr-reader";
import { KioskHeader } from "../_header";

export const ReservationConfirmPage = () => {
  const { openModal } = useModal("modal-reservation-confirm-result");
  return (
    <>
      <ReservationConfirmResultModal />
      <KioskHeader title="예약확인" />
      <div className="flex h-full w-full items-center justify-center pt-24">
        <div className="w-1/2">
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
        </div>
      </div>
    </>
  );
};
