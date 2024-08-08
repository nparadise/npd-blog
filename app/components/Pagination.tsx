"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback } from "react";
import { FaEllipsis } from "react-icons/fa6";

interface ButtonProps {
  isCurrentPage: boolean;
  href: string;
  children?: React.ReactNode;
}

function PaginationInput({
  pages,
  currentPage,
}: {
  pages: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(key, value);
      return params.toString();
    },
    [searchParams],
  );

  const createHref = useCallback(
    (params: string) => {
      return `${pathname}?${params}`;
    },
    [pathname],
  );

  const onSubmitHandle = useCallback(
    (data: FormData) => {
      let value = currentPage.toString();
      if (data.has("pageInput")) {
        const res = data.get("pageInput");
        value = res ? (res as string) : value;
      }

      router.push(createHref(createQueryString("page", value)));
    },
    [createHref, createQueryString, router, currentPage],
  );

  return (
    <form
      className="hidden h-8 px-2 align-middle md:inline-block"
      action={onSubmitHandle}
    >
      <span className="font-gothic text-sm">Go to page</span>
      <input
        id="pageInput"
        name="pageInput"
        placeholder={currentPage.toString()}
        className="mx-1 inline-block h-8 w-9 border border-gray-200 py-0.5 text-center align-middle"
      />
      <span className="text-sm">/ {pages}</span>
      <button
        type="submit"
        className="ms-2 h-8 rounded-sm bg-blue-400 px-2 align-middle text-white"
      >
        확인
      </button>
    </form>
  );
}

function PaginationEllipsis() {
  return (
    <div className="mx-0.5 inline-flex size-8 items-center justify-center rounded-sm border border-gray-300 align-middle">
      <FaEllipsis />
    </div>
  );
}

function PaginationButton({ isCurrentPage, href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "mx-0.5 inline-block size-8 rounded-sm border text-center align-middle leading-8",
        {
          "border-blue-400 bg-blue-400 text-white": isCurrentPage,
          "border-gray-300": !isCurrentPage,
        },
      )}
    >
      {children}
    </Link>
  );
}

// const MD_WIDTH: number = 768;
interface Props {
  pages: number;
  currentPage: number;
}

function Pagination({ pages, currentPage }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(key, value);
      return params.toString();
    },
    [searchParams],
  );

  const createHref = useCallback(
    (params: string) => {
      return `${pathname}?${params}`;
    },
    [pathname],
  );

  const createPaginationButton = useCallback(
    (page: number, currentPage: number) => {
      return (
        <PaginationButton
          key={`page-${page}`}
          isCurrentPage={page === currentPage}
          href={createHref(createQueryString("page", page.toString()))}
        >
          {page}
        </PaginationButton>
      );
    },
    [createHref, createQueryString],
  );

  const buttons: React.ReactNode[] = [];
  if (pages <= 7) {
    for (let i = 1; i <= pages; i++) {
      buttons.push(createPaginationButton(i, currentPage));
    }
  } else {
    buttons.push(createPaginationButton(1, currentPage));
    if (currentPage <= 4) {
      buttons.push(createPaginationButton(2, currentPage));
      buttons.push(createPaginationButton(3, currentPage));
      buttons.push(createPaginationButton(4, currentPage));
      buttons.push(createPaginationButton(5, currentPage));
      buttons.push(<PaginationEllipsis key="ellipsis-after" />);
    } else if (currentPage >= pages - 3) {
      buttons.push(<PaginationEllipsis key="ellipsis-before" />);
      buttons.push(createPaginationButton(pages - 4, currentPage));
      buttons.push(createPaginationButton(pages - 3, currentPage));
      buttons.push(createPaginationButton(pages - 2, currentPage));
      buttons.push(createPaginationButton(pages - 1, currentPage));
    } else {
      buttons.push(<PaginationEllipsis key="ellipsis-before" />);
      buttons.push(createPaginationButton(currentPage - 1, currentPage));
      buttons.push(createPaginationButton(currentPage, currentPage));
      buttons.push(createPaginationButton(currentPage + 1, currentPage));
      buttons.push(<PaginationEllipsis key="ellipsis-after" />);
    }
    buttons.push(createPaginationButton(pages, currentPage));
  }
  buttons.push(
    <PaginationInput
      pages={pages}
      currentPage={currentPage}
      key="pagination-input"
    />,
  );

  return (
    <div id="pagination" className="mx-auto w-fit">
      {buttons}
    </div>
  );
}

export default memo(Pagination);
