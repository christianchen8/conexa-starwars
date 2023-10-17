"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/sw_logo.png";
import { usePathname } from "next/navigation";
import { Turn as Hamburger } from "hamburger-react";

export function Header() {
  const pathname = usePathname();

  return (
    <div
      className={`absolute w-full  h-[4rem] top-0 left-0 z-[300] text-white px-5 sm:px-10 xl:px-20 flex items-center ${
        pathname !== "/" ? "justify-between bg-black" : "justify-center"
      } `}
    >
      <Link href={"/"}>
        <Image src={logo} alt="logo" height={100} width={150} />
      </Link>

      {pathname !== "/" && (
        <div className="w-[50%] hidden lg:flex justify-end uppercase text-[100]">
          {["films", "people", "planets", "starships"].map((items) => {
            const samePathname = `/${items}` === pathname;

            return (
              <Link
                href={`/${items}`}
                key={items}
                className={`ml-4 cursor-pointer ${
                  samePathname ? "text-yellow-500" : "text-white"
                } `}
              >
                {items}
              </Link>
            );
          })}
        </div>
      )}
      <div className="mobileMenu">
        <Hamburger
          color="white"
          // toggle={setOpenMenu}
          // toggled={openMenu}
          size={25}
        />
      </div>
    </div>
  );
}
