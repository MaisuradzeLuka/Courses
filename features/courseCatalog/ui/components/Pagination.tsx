import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageRange } from "@/lib/utils";
import { CourseCatalogMetaType } from "@/types";

type CoursePaginationProps = CourseCatalogMetaType & {
  onPageChange: (page: number) => void;
};

const CoursePagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: CoursePaginationProps) => {
  if (lastPage <= 1) return null;

  const pages = getPageRange(currentPage, lastPage);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < lastPage;

  const handlePage = (page: number) => {
    if (page < 1 || page > lastPage || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <Pagination className="mt-8 text-brand-500">
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePage(currentPage - 1);
            }}
            aria-disabled={!hasPrev}
            className={`bg-gray-50 w-10 h-10 border-gray-200 rounded-sm text-[16px] font-medium ${!hasPrev ? "pointer-events-none opacity-50" : ""}`}
          />
        </PaginationItem>

        {pages.map((page, idx) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                className="bg-gray-50 w-10 h-10 border-gray-200 rounded-sm text-[16px] font-medium"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePage(currentPage + 1);
            }}
            aria-disabled={!hasNext}
            className={`bg-gray-50 w-10 h-10 border-gray-200 rounded-sm text-[16px] font-medium ${!hasNext ? "pointer-events-none opacity-50" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CoursePagination;
