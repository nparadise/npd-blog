"use client";

import Image from "next/image";
import { FaBars } from "react-icons/fa6";

import profile from "@/public/Logo.jpg";
import useComponentVisible from "../hooks/useComponentVisible";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export default function SideMenu({ children }: Props) {
  const [navRef, isNavVisible, setIsNavVisible] =
    useComponentVisible<HTMLButtonElement>();

  const handleCollapseClick = () => {
    setIsNavVisible((prev) => !prev);
  };

  return (
    <div className="absolute w-full bg-blue-400 md:static md:col-span-1 md:h-dvh md:w-auto">
      <div className="relative w-full border-b-4 md:static md:mx-auto">
        <Image
          src={profile}
          alt="profile image"
          className="my-4 hidden md:mx-auto md:block md:max-w-48 md:rounded-full"
        />
        <h2 className="bg-blue-300 py-2 text-center font-myeongjo text-3xl font-semibold">
          <Link href="/">NParadise Blog</Link>
        </h2>
        <div className="absolute right-3 top-0 flex h-full items-center md:hidden">
          <button
            ref={navRef}
            type="button"
            className="cursor-pointer rounded-md bg-white p-1.5 hover:bg-blue-200"
            onClick={handleCollapseClick}
          >
            <FaBars className="size-5" />
          </button>
        </div>
      </div>
      <nav
        className={`mx-auto box-border max-w-80 overflow-hidden px-2 font-gothic transition-all duration-300 ease-in-out md:max-h-screen md:py-4 md:transition-none ${isNavVisible ? "max-h-screen py-4" : "max-h-0 py-0"} md:block`}
      >
        {children}
      </nav>
    </div>
  );
}
