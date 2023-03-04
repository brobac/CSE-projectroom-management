declare module "@types" {
  type UserType = "ROLE_MEMBER" | "ROLE_ADMIN" | "kiosk";
  interface User {
    name: string;
    memberId: number;
    roleType: UserType;
  }
}
