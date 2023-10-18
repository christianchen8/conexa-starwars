"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/sw_logo.png";
import { usePathname } from "next/navigation";
import { Turn as Hamburger } from "hamburger-react";

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const navItems = ["films", "people", "planets", "starships"];

  return (
    pathname !== "/home" &&
    pathname !== "/" && (
      <div
        className={`absolute w-full  h-[5rem] top-0 left-0 z-[300] text-white px-5 sm:px-10 xl:px-20 flex items-center ${
          pathname !== "/" ? "justify-between" : "justify-center"
        } `}
      >
        <Link href={"/home"}>
          <Image src={logo} alt="logo" height={100} width={120} />
        </Link>

        <div className="w-[50%] hidden lg:flex justify-end uppercase text-[100]">
          {navItems.map((items) => {
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

        <div className="mobileMenu" style={{ border: "1px solid white" }}>
          <Hamburger
            color="white"
            toggle={setOpenMenu}
            toggled={openMenu}
            size={25}
          />
        </div>

        {openMenu && (
          <div className={"menu"}>
            <div className="border border-b-white border-[0.5px] w-full "></div>
            {navItems.map((item) => {
              return (
                <Link
                  href={`/${item}`}
                  className={"mobileItems"}
                  key={item}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  <h1>{item} </h1>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    )
  );
}
