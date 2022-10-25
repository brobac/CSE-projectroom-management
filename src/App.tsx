import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LoginModal, ReservationDatepickerModal } from "@components";
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
