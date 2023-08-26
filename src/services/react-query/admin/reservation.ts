import { fetchAdminReservationList } from "@/services/api/admin/reservation";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { FetchAdminReservationListOptions } from "@types";

export const useFetchAdminReservationList = (
  options?: FetchAdminReservationListOptions,
) => {
  const { data, isLoading } = useQuery(
    [queryKeys.admin, queryKeys.reservation, options?.page, options?.size],
    () => fetchAdminReservationList(options),
    { select: (data) => data.result, keepPreviousData: true },
  );

  return { data, isLoading };
};
