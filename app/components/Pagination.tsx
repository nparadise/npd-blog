"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { memo, useCallback } from "react";

interface ButtonProps {
  isCurrentPage: boolean;
  href: string;
  children?: React.ReactNode;
  onClick?: (event: MouseEvent) => void;
}

function PaginationNonButton({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mx-0.5 inline-block size-8 rounded-sm border border-gray-300 text-center align-middle leading-8">
      {children}
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

const MD_WIDTH: number = 768;
interface Props {
  pages: number;
  currentPage: number;
}

function Pagination({ pages, currentPage }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const windowWidth = globalThis.screen.width;

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
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

  const buttons: React.ReactNode[] = [];
  buttons.push(
    <PaginationButton
      key="page-1"
      isCurrentPage={1 === currentPage}
      href={createHref(createQueryString("page", "1"))}
    >
      1
    </PaginationButton>,
  );
  if (pages > 1) {
    for (let i = 2; i < pages; i++) {
      buttons.push(
        <PaginationButton
          key={`page-${i}`}
          isCurrentPage={i === currentPage}
          href={createHref(createQueryString("page", i.toString()))}
        >
          {i}
        </PaginationButton>,
      );
    }
    buttons.push(
      <PaginationButton
        key="page-1"
        isCurrentPage={1 === currentPage}
        href={createHref(createQueryString("page", "1"))}
      >
        1
      </PaginationButton>,
    );
  }

  return (
    <div id="pagination" className="mx-auto w-fit">
      {buttons}
    </div>
  );
}

export default memo(Pagination);
