import { AdminReservationDTO } from "@types";
import { atom } from "recoil";

export const adminSelectedReservationState = atom<AdminReservationDTO>({
  key: "adminSelectedReservationState",
  default: {
    member: { loginId: "", memberId: 0, name: "" },
    reservation: {
      startAt: "",
      endAt: "",
      reservationId: 0,
      reservationStatus: { status: "", statusCode: "" },
      roomName: "",
      tableName: "",
    },
    tableReturn: {
      returnAt: "",
      cleanupPhoto: {
        fileLocalName: "",
        fileOriName: "",
        fileUrl: "",
      },
      tableReturnId: 0,
    },
  },
});
