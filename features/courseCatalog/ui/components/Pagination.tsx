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
import { useRouter } from "next/navigation";

const CoursePagination = ({ currentPage, lastPage }: CourseCatalogMetaType) => {
  const router = useRouter();
  if (lastPage <= 1) return null;

  const pages = getPageRange(currentPage, lastPage);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < lastPage;

  const handlePage = (page: number) => {
    if (page < 1 || page > lastPage || page === currentPage) return;

    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete("page");

    searchParams.append("page", page.toString());

    const newPath = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPath);
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
                className={` w-10 h-10  rounded-sm text-[16px] font-medium ${
                  page === currentPage
                    ? "bg-brand-600 text-gray-50"
                    : "bg-gray-50 border-gray-200"
                }`}
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
