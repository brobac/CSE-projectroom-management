declare module "@types" {
  type SignupDTO = {
    name: string;
    email: string;
    loginId: string;
    password: string;
  };

  type LoginDTO = {
    loginId: string;
    password: string;
  };

  type LogoutDTO = {
    accessToken: "string";
    refreshToken: "string";
  };
}
