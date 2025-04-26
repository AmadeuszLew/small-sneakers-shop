export class Pagination<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  numberOfElements: number;

  constructor(
    content: T[],
    pageable: {
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    },
    totalPages: number,
    totalElements: number,
    last: boolean,
    first: boolean,
    size: number,
    numberOfElements: number,
  ) {
    this.content = content;
    this.pageable = pageable;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.last = last;
    this.first = first;
    this.size = size;
    this.numberOfElements = numberOfElements;
  }
}
