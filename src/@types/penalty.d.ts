declare module "@types" {
  type PenaltyDTO = {
    id: number;
    userId: number;
    startDate: DateValue;
    endDate: DateValue;
    description: string;
  };
}
