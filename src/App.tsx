import { LoginModal } from "@components";
import { ReservationDatepickerModal } from "@components/modals/ReservationDatePickerModal";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReservationPage } from "./pages/reservation";

function App() {
  return (
    <BrowserRouter>
      <LoginModal />
      <ReservationDatepickerModal />
      <ReservationPage />
    </BrowserRouter>
  );
}

export default App;
