declare module "@types" {
  type UserType = "ROLE_MEMBER" | "admin" | "kiosk";
  type User = {
    name: string;
    memberId: number;
    roleType: UserType;
  };
}
