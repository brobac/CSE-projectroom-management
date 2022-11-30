import { useNavigate } from "react-router-dom";

export const KioskMainPage = () => {
  const navigate = useNavigate();

  const toReservation = () => navigate("reservation");
  const toReservationConfirm = () => navigate("reservation-confirm");

  return (
    <div className="flex h-screen w-full items-center justify-center gap-20">
      <button
        onClick={toReservation}
        className="btn-primary btn relative flex flex-1 items-center justify-center overflow-hidden pb-1/2"
      >
        <div className=" l-0 absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 lg:gap-6 xl:gap-12">
          <h2 className="text-3xl  font-bold text-white lg:text-7xl xl:text-8xl">
            현장 예약
          </h2>
          <img
            src="./images/reception.png"
            alt="큐알코드"
            className=" w-3/5 object-contain"
          />
        </div>
      </button>
      <button
        onClick={toReservationConfirm}
        className="btn-secondary btn relative flex flex-1 items-center justify-center overflow-hidden pb-1/2"
      >
        <div className=" l-0 absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 lg:gap-6 xl:gap-12">
          <h2 className="text-3xl  font-bold text-white lg:text-7xl xl:text-8xl">
            예약 확인
          </h2>
          <img
            src="./images/qr-code.png"
            alt="큐알코드"
            className=" w-3/5 object-contain"
          />
        </div>
      </button>
    </div>
  );
};
