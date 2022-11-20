import { MyPageHeader } from "./_header";
import { PenaltyInfo } from "./_penaltyInfo";
import {
  UnfinishedReservation,
  UnfinishedReservationProps,
} from "./_reservationInfo";

const tempQRImageSrc =
  "https://ironsoftware.com/img/tutorials/creating-qr-barcodes-in-dot-net/csharp-rendered-qrcode.png";

const tempUnfinishedReservationList: UnfinishedReservationProps[] = [
  {
    id: 1,
    reservationDate: "2022-11-24",
    startDateTime: "2022-11-24 11:00",
    endDateTime: "2022-11-24 13:00",
    projectroom: "D330",
    table: "A1",
    qrCode: tempQRImageSrc,
    reservationState: "반납 대기중",
  },
  {
    id: 2,
    reservationDate: "2022-11-24",
    startDateTime: "2022-11-24 11:00",
    endDateTime: "2022-11-24 13:00",
    projectroom: "D330",
    table: "A1",
    qrCode: tempQRImageSrc,
    reservationState: "예약완료",
  },
  {
    id: 3,
    reservationDate: "2022-11-24",
    startDateTime: "2022-11-24 11:00",
    endDateTime: "2022-11-24 13:00",
    projectroom: "D330",
    table: "A1",
    qrCode: tempQRImageSrc,
    reservationState: "예약완료",
  },
];

export const MyPage = () => {
  return (
    <>
      <MyPageHeader />
      <div className="flex w-full max-w-screen-2xl flex-col items-center px-4 pt-16">
        <PenaltyInfo />
        {/* <----- 진행중인 예약 -----> */}
        <div className="flex w-full flex-col items-center gap-4 pt-4">
          <p className="text-2xl font-bold">진행중인 예약</p>
          <div className="flex w-full max-w-xs flex-col gap-2">
            {tempUnfinishedReservationList.map((reservation) => (
              <UnfinishedReservation {...reservation} />
            ))}
          </div>
        </div>
        {/* <----- 진행중인 예약 -----> */}
        {/* <-----QR 영역 -----> */}
        <div className="flex flex-col items-center">
          <div className=" w-60 border-8 border-base-content p-2">
            <img src={tempQRImageSrc} alt="큐알코드" className="w-full" />
          </div>
          <p>* 타인에게 QR코드가 노출되지 않도록 주의해주세요</p>
        </div>
        {/* <----- 진행중인 예약 -----> */}
      </div>
    </>
  );
};
