export * from "./LoginModal";
export * from "./ReservationDatePickerModal";
export * from "./MyQRCode";

export const MODAL_TYPE = {
  LOGIN: "modal-login",
  RESERVAION_DATE_PICKER: "modal-reservation-date-picker",
  QR_CODE: "modal-qrcode",
} as const;
