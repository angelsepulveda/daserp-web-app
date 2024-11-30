export type BasePagination<T> = {
  data: T[];
  count: number;
  pageIndex: number;
  pageSize: number;
};
