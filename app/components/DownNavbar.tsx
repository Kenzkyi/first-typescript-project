"use client";
import React from "react";
import "@/app/styles/downNavbar.scss";
import Image from "next/image";
import { navBar } from "../asset/navBar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DownNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="DownNavbar">
      <div className="DownNavbar-holder">
        {navBar.map((item, index) => (
          <Link
            key={index}
            style={{ textDecoration: "none" }}
            href={item?.path}>
            {pathname === item?.path ? (
              <main>
                <Image
                  src={item?.iconActive}
                  height={18}
                  width={18}
                  alt="overview"
                />
                <h6>{item?.name}</h6>
              </main>
            ) : (
              <section>
                <Image src={item?.icon} height={18} width={18} alt="overview" />
                <h6>{item?.name}</h6>
              </section>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DownNavbar;
