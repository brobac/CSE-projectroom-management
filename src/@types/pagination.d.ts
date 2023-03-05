declare module "@types" {
  interface Page<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
  }

  interface Pageable {}

  interface Sort {
    empty: boolean;
    sortred: boolean;
    unsorted: boolean;
  }
}
