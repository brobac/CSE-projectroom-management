import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReservationPage } from "./pages/reservation";

function App() {
  return (
    <BrowserRouter>
      <ReservationPage />
    </BrowserRouter>
  );
}

export default App;
