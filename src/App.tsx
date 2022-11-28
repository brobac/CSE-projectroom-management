import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginModal, ReservationDatepickerModal } from "@components";
import { ReservationPage } from "./pages/reservation";
import { MyPage } from "./pages/user/mypage";
import { ReservationServiceLayout } from "./templates/ReservationServiceLayout";
import { MyReservationList } from "./pages/user/reservationList";
import { MyPageLayout } from "./pages/user/_layout";
import { MyPenaltyList } from "./pages/user/penaltyList";
import { SignupPage } from "./pages/signup";

function App() {
  return (
    <BrowserRouter>
      <LoginModal />
      <ReservationDatepickerModal />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
