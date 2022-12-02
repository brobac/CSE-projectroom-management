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

  type MemberComplexInfo = {
    pastReservationCount: number;
    penaltyInfo: PenaltyInfo | null;
    qrImage: QRImageInfo | null;
    violationCount: number;
  };

  type PenaltyInfo = {
    endDateTime: string;
    startDateTime: string;
  };

  type QRImageInfo = {
    imageName: string;
    imageURL: string;
  };
}
