import { useModal } from "@/hooks/useModal";
import { MyQRCodeModal } from "@components";

export const QRSection = () => {
  const { openModal } = useModal("modal-qrcode");

  return (
    <div className="w-full max-w-xs py-8">
      <button
        onClick={openModal}
        className="btn-outline btn-primary btn w-full"
      >
        QR코드 확인
      </button>
      <MyQRCodeModal />
    </div>
  );
};
