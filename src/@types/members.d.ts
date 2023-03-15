declare module "@types" {
  interface SignupDTO {
    name: string;
    email: string;
    loginId: string;
    password: string;
  }

  interface VerifyEmailAuthCodeDTO {
    code: string;
    email: string;
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
    penaltyCount: number;
    penaltyInfo: PenaltyInfo | null;
    qrImage: QRImageInfo | null;
    violationCount: number;
  }

  interface PenaltyInfo {
    endAt: string;
    startAt: string;
  }

  interface QRImageInfo {
    imageName: string;
    imageURL: string;
  }
}
