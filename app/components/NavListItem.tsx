"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "url";

interface Props {
  children?: React.ReactNode;
  href: UrlObject | string;
}

export default function NavListItem({ children, href }: Props) {
  const pathname = usePathname();

  return (
    <li className="first:pt-0.5">
      <Link
        href={href}
        className={clsx(
          "block border-l-2 border-slate-600 pl-4 text-slate-800 hover:border-black hover:text-black hover:underline hover:underline-offset-4",
          { "bg-blue-600 text-white hover:text-white": pathname === href },
        )}
      >
        {children}
      </Link>
    </li>
  );
}
