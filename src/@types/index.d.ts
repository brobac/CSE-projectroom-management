declare module "@types" {
  type DateValue = string | number | Date;

  type CommonAPIResponse<T> = {
    code: string;
    message: string;
    result: T;
  };
}
