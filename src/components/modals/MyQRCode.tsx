import { Modal } from "@components/modals/Modal";

const tempQRImageSrc =
  "https://ironsoftware.com/img/tutorials/creating-qr-barcodes-in-dot-net/csharp-rendered-qrcode.png";

export const MyQRCodeModal = () => {
  return (
    <Modal type="modal-qrcode" closeButton>
      <div className="flex flex-col items-center gap-2">
        <div className=" w-60 border-8 border-base-content p-2">
          <img src={tempQRImageSrc} alt="큐알코드" className="w-full" />
        </div>
        <p className="text-sm text-error">
          * 타인에게 QR코드가 노출되지 않도록 주의해주세요
        </p>
      </div>
    </Modal>
  );
};
