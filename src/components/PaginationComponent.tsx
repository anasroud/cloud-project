import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPreviousClick?: () => void;
  onNextClick?: () => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onNextClick,
  onPreviousClick,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-muted-foreground grow text-sm" aria-live="polite">
        Page <span className="text-foreground">{currentPage}</span> of{" "}
        <span className="text-foreground">{totalPages}</span>
      </p>
      <Pagination className="w-auto">
        <PaginationContent className="gap-3">
          <PaginationItem>
            <Button
              variant="secondary"
              className="aria-disabled:pointer-events-none h-fit w-fit aria-disabled:opacity-50"
              aria-disabled={currentPage === 1 ? true : undefined}
              role={currentPage === 1 ? "link" : undefined}
              onClick={onPreviousClick}
              asChild
            >
              <a>
              Previous

              </a>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="secondary"
              className="aria-disabled:pointer-events-none h-fit w-fit aria-disabled:opacity-50"
              aria-disabled={currentPage === totalPages ? true : undefined}
              role={currentPage === totalPages ? "link" : undefined}
              onClick={onNextClick}
              asChild
            >
              <a>
              Next

              </a>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
