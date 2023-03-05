declare module "@types" {
  interface SignupDTO {
    name: string;
    email: string;
    loginId: string;
    password: string;
  }

  interface LoginDTO {
    loginId: string;
    password: string;
  }

  interface LogoutDTO {
    accessToken: "string";
    refreshToken: "string";
  }

  interface MemberSimpleInfo {
    loginId: string;
    memberId: number;
    name: string;
  }

  interface MemberComplexInfo {
    pastReservationCount: number;
    penaltyInfo: PenaltyInfo | null;
    qrImage: QRImageInfo | null;
    violationCount: number;
  }

  interface PenaltyInfo {
    endDateTime: string;
    startDateTime: string;
  }

  interface QRImageInfo {
    imageName: string;
    imageURL: string;
  }
}
