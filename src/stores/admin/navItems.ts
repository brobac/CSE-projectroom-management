const ADMIN_ROUTE = "/admin";

export const ADMIN_NAVIGAITON_ITEMS = [
  { path: `${ADMIN_ROUTE}/reservations`, title: "예약 내역 조회" },
  { path: `${ADMIN_ROUTE}/reservation-deactivation`, title: "예약 비활성화" },
  { path: `${ADMIN_ROUTE}/complaints`, title: "민원 조회" },
  { path: `${ADMIN_ROUTE}/penalty`, title: "사용자 제재 관리" },
  { path: `${ADMIN_ROUTE}/reservation-policy`, title: "정책 변경" },
] as const;
