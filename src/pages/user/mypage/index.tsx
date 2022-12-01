import { MyPageHeader } from "./_header";
import { History } from "./_history";
import { PenaltyInfo } from "./_penaltyInfo";
import { QRSection } from "./_qrSection";
import {
  UnfinishedReservation,
  UnfinishedReservationProps,
} from "./_reservationInfo";

const tempQRImageSrc =
  "https://ironsoftware.com/img/tutorials/creating-qr-barcodes-in-dot-net/csharp-rendered-qrcode.png";

const tempUnfinishedReservationList: UnfinishedReservationProps[] = [];

export const MyPage = () => {
  return (
    <>
      <PenaltyInfo />
      {/* <----- 진행중인 예약 -----> */}
      <div className="flex w-full flex-col items-center gap-4 pt-4">
        <p className="text-2xl font-bold">진행중인 예약</p>
        <div className="flex w-full max-w-xs flex-col gap-2">
          {tempUnfinishedReservationList.map((reservation) => (
            <UnfinishedReservation key={reservation.id} {...reservation} />
          ))}
        </div>
      </div>
      {/* <----- 진행중인 예약 -----> */}
      <History />
      <QRSection />
    </>
  );
};
