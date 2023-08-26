import { getJWTHeader, _axios } from "@/services/axiosService";
import {
  AdminReservationDTO,
  FetchAdminReservationListOptions,
  Page,
} from "@types";
import { ADMIN_URL } from ".";
import { HTTP_METHOD } from "..";

export const fetchAdminReservationList = async (
  options: FetchAdminReservationListOptions = { page: 0, size: 20 },
) => {
  return _axios<Page<AdminReservationDTO>>({
    url: `${ADMIN_URL}/reservations`,
    method: HTTP_METHOD.GET,
    headers: getJWTHeader(),
    params: options,
  });
};
