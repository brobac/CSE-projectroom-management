import { fetchAdminReservationList } from "@/services/api/admin/reservation";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

export const useFetchAdminReservationList = () => {
  const { data, isLoading } = useQuery(
    [queryKeys.admin, queryKeys.reservation],
    () => fetchAdminReservationList(),
    { select: (data) => data.result },
  );

  return { data, isLoading };
};
