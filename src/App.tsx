import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginModal, ReservationDatepickerModal } from "@components";
import { ReservationPage } from "./pages/reservation";
import { MyPage } from "./pages/user/mypage";
import { ReservationServiceLayout } from "./templates/ReservationServiceLayout";
import { MyReservationList } from "./pages/user/reservationList";
import { MyPageLayout } from "./pages/user/_layout";
import { MyPenaltyList } from "./pages/user/penaltyList";
import { SignupPage } from "./pages/signup";
import { KioskMainPage } from "./pages/kiosk/main";
import { KioskLayout } from "./pages/kiosk/_layout";
import { KioskReservationPage } from "./pages/kiosk/kiosk-reservation";
import { KioskReservationLayout } from "./pages/kiosk/kiosk-reservation/_layout";
import { KioskReservationTimeSelectPage } from "./pages/kiosk/kiosk-reservation/_timeSelectPage";
import { ReservationConfirmPage } from "./pages/kiosk/reservation-confirm";
import { ReservationConfirmResultModal } from "@components/modals/ReservationConfirmResultModal";
import { PageNotFound } from "./pages/404";
import { Memberlayout, RestrictedAuthLayout } from "./templates/routes";
import { useUserState } from "./stores/user";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ReservationReturnPage } from "./pages/user/reservationReturn";

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const { refreshUser } = useUserState();

  useEffect(() => {
    const loadApp = async () => {
      await refreshUser();
      setIsAppLoading(false);
    };
    loadApp();
  }, []);

  if (isAppLoading) return <div className="h-screen w-full bg-base-100"></div>;
  return (
    <>
      <ToastContainer position="top-left" autoClose={3000} />
      <BrowserRouter>
        <LoginModal />
        <ReservationDatepickerModal />
        <ReservationConfirmResultModal />
        <Routes>
          {/* 웹 예약 */}
          <Route path="/" element={<ReservationServiceLayout />}>
            <Route path="/" element={<ReservationPage />} />
            <Route element={<Memberlayout />}>
              <Route path="/mypage" element={<MyPageLayout />}>
                <Route path="/mypage" element={<MyPage />} />
                <Route
                  path="reservation-list"
                  element={<MyReservationList />}
                />
                <Route path="penalty-list" element={<MyPenaltyList />} />
                <Route
                  path="return/:reservationId"
                  element={<ReservationReturnPage />}
                />
              </Route>
            </Route>
          </Route>
          {/* 키오스크 */}
          <Route path="kiosk" element={<KioskLayout />}>
            <Route path="" element={<KioskMainPage />} />
            <Route path="reservation" element={<KioskReservationLayout />}>
              <Route path="" element={<KioskReservationPage />} />
              <Route
                path="time-select"
                element={<KioskReservationTimeSelectPage />}
              />
            </Route>
            <Route
              path="reservation-confirm"
              element={<ReservationConfirmPage />}
            />
          </Route>
          <Route element={<RestrictedAuthLayout />}>
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
