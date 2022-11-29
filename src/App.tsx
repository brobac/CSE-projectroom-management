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

function App() {
  return (
    <BrowserRouter>
      <LoginModal />
      <ReservationDatepickerModal />
      <ReservationConfirmResultModal />
      <Routes>
        <Route path="/" element={<ReservationServiceLayout />}>
          <Route path="/" element={<ReservationPage />} />
          <Route path="/mypage" element={<MyPageLayout />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="reservation-list" element={<MyReservationList />} />
            <Route path="penalty-list" element={<MyPenaltyList />} />
          </Route>
        </Route>
        <Route path="signup" element={<SignupPage />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
