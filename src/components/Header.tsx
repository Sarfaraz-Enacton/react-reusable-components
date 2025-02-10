import { Link } from "react-router-dom";
import Button from "./core/Button";
import { routes } from "../utils/routes-config";
import { useEffect, useState } from "react";

const Header = () => {
  const [navExpanded, setNavExpanded] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  const handleNav = () => {
    setNavExpanded(!navExpanded);
  };

  useEffect(() => {
    navExpanded
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [navExpanded]);

  // to show white bg when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      scrollPosition > 80 ? setScroll(true) : setScroll(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);
  const links = [
    {
      id: 1,
      name: "About Us",
      url: routes.aboutUs,
    },
    {
      id: 2,
      name: "Contact Us",
      url: routes.contactUS,
    },
    {
      id: 3,
      name: "Services",
      url: routes.service,
    },
  ];
  return (
    <>
      <header
        className={`sticky top-0 z-10 py-3.5 ${
          scroll ? "bg-gray-50/85 shadow-md backdrop-blur-lg" : "bg-gray-50"
        } overflow-hidden`}
      >
        <div className="container">
          <nav className="flex items-center justify-between gap-4">
            <Link
              to={routes.home}
              className="h-8 rounded-lg transition duration-300 ease-in-out hover:opacity-85 active:outline-gray-200"
            >
              <img className="max-h-8" src="/images/logo.svg" alt="logo" />
            </Link>
            <ul className="flex items-center gap-4 max-md:hidden">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    className="rounded-lg px-2 py-1 font-medium transition duration-300 ease-in-out hover:bg-gray-200"
                    to={link.url}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 max-md:hidden">
              <Button
                role="link"
                variant="outline"
                size="md"
                label={"login"}
                link={routes.register}
              />
              <Button
                role="link"
                variant="primary"
                size="md"
                label={"Register"}
                link={routes.register}
              />
            </div>
            <button
              className="rounded-md bg-gray-200 p-1 sm:p-2 md:hidden"
              onClick={handleNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>
      {navExpanded && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setNavExpanded(false);
          }}
          className={`fixed inset-0 z-10 h-full w-full bg-black/30 md:hidden`}
        ></div>
      )}

      <div
        className={`fixed bottom-0 right-0 top-0 z-20 flex h-full w-full max-w-[280px] flex-col bg-white ${
          navExpanded ? "translate-x-0" : "translate-x-full"
        } transform-gpu duration-300 ease-in-out md:hidden`}
      >
        <div className="flex items-center justify-end gap-4 bg-gray-50 px-4 py-3.5">
          <button
            className="rounded-md bg-gray-200 p-1 sm:p-2 md:hidden"
            onClick={handleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="h-fulls justify-centers my-auto flex flex-col items-center gap-4 overflow-y-auto px-4 py-3.5">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                className="rounded-lg px-2 py-1 font-medium transition duration-300 ease-in-out hover:bg-gray-200"
                to={link.url}
                onClick={handleNav}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-4 px-4 py-8">
          <Button
            role="link"
            variant="outline"
            size="md"
            label={"login"}
            link={routes.register}
            onClick={handleNav}
          />
          <Button
            role="link"
            variant="primary"
            size="md"
            label={"Register"}
            link={routes.register}
            onClick={handleNav}
          />
        </div>
      </div>
    </>
  );
};

export default Header;

// import React, { Children } from "react";

// <SectionHead>
//   <SectionHead.Title>Our Services</SectionHead.Title>
//   <SectionHead.Description>
//     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
//     eirmod tempor invidunt ut labore et.
//   </SectionHead.Description>
// </SectionHead>;
// export default function SectionHead({ children }) {
//   return (
//     <>
//       <div className="space-y-4 md:space-y-6">{children}</div>
//     </>
//   );
// }

// const titleHint = ({ children, customClass }) => {
//   return (
//     <h5
//       class={`${customClass} text-circular text-blue font-semibold text-center capitalize undefined`}
//     >
//       {children}
//     </h5>
//   );
// };

// const Title = ({ children, customClass }) => {
//   return (
//     <h1
//       class={`${customClass} font-circular font-semibold text-black text-3xl md:text-4xl  text-center xl:text-5xl undefined`}
//     >
//       {children}
//     </h1>
//   );
// };

// const Description = ({ children, customClass }) => {
//   return (
//     <p
//       class={`${customClass} max-w-3xl text-base text-black md:text-xl mx-auto text-center`}
//     >
//       {children}
//     </p>
//   );
// };

// SectionHead.titleHint = titleHint;
// SectionHead.Title = Title;
// SectionHead.Description = Description;
