// app/types/pagination.ts

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

  export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
