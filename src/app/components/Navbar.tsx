"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-[#05252C] border border-[#197686] text-black p-2 rounded-[20px] w-[95%] md:w-[1120px] mx-auto top-0 left-0 shadow-md mt-4">
      <div className="flex items-center justify-between h-10 mt-2">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/assets/icon.png"
              alt="Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </Link>
          <Link href="/">
            <Image
              src="/assets/ticz.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:flex space-x-10 font-semibold">
          {[
            { href: "/", label: "Events" },
            { href: "/tickets", label: "My Tickets" },
            { href: "/about", label: "About Project" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`font-['JejuMyeongjo'] relative pl-4 ${
                  pathname === link.href
                    ? "text-white before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-secondary"
                    : "text-[#B3B3B3]"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <Link href="/tickets">
          <span className="bg-white h-10 w-32 border rounded-md flex items-center gap-2 justify-center cursor-pointer">
            My Tickets
            <span>
              <div data-svg-wrapper>
                <svg
                  width="18"
                  height="8"
                  viewBox="0 0 18 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5L17 4.5V3.5L1 3.5V4.5Z"
                    fill="#0A0C11"
                  />
                </svg>
              </div>
            </span>
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
