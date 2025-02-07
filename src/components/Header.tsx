import { Link } from "react-router-dom";
import Button from "./core/Button";
import { routes } from "../utils/routes-config";

const Header = () => {
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
    <header className="bg-gray-50 py-2.5">
      <div className="container">
        <nav className="flex items-center justify-between gap-4">
          <Link
            to={routes.home}
            className="h-9 rounded-lg transition duration-300 ease-in-out hover:opacity-85 active:outline-gray-200"
          >
            <img className="max-h-9" src="/images/logo.svg" alt="logo" />
          </Link>
          <ul className="flex items-center gap-4">
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
          <div className="flex items-center gap-4">
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
        </nav>
      </div>
    </header>
  );
};

export default Header;

// import React, { useEffect, useState } from "react";
// import { Button } from "./Button";
// import { NavLink } from "react-router-dom";
// import { menuItems } from "../data/appData";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

// export const NavLinks = ({ linksCustomClass, customClass }) => {
//   return (
//     <div
//       className={`flex items-center gap-6 lg:gap-16 flex-shrink-0 pl-5 ${customClass}`}
//     >
//       <ul
//         className={`flex gap-4 lg:gap-8 text-primary text-base lg:text-lg font-medium uppercase ${linksCustomClass}`}
//       >
//         {menuItems.map((item) => (
//           <li key={item.id}>
//             <NavLink
//               activeclassname="active"
//               to={item.url}
//               className={
//                 "hover:text-secondary transition-all ease-in-out duration-300"
//               }
//             >
//               {item.name}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//       <Button variants={"primary"} text="Register" role={"button"} />
//     </div>
//   );
// };

// export const Header = () => {
//   const [navExpanded, setNavExpanded] = useState(false);
//   const [scroll, setScroll] = useState(false);

//   const handleNav = () => {
//     setNavExpanded(!navExpanded);
//     // console.log("clicked");
//   };

//   // to stop scrolling of body when nav menu is open
//   useEffect(() => {
//     navExpanded
//       ? (document.body.style.overflow = "hidden")
//       : (document.body.style.overflow = "auto");
//   }, [navExpanded]);

//   // to show white bg when scrolling
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       scrollPosition > 80 ? setScroll(true) : setScroll(false);
//     };
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.addEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <header
//       className={`w-full py-4 lg:py-6 ${
//         scroll ? "bg-light shadow-lg" : "bg-transparent"
//       } fixed mx-auto z-50`}
//     >
//       <nav className="container flex justify-between items-center font-primary">
//         <div className="">
//           <img
//             className="max-h-10 lg:max-h-16"
//             src="/images/nav-logo.png"
//             alt=""
//           />
//         </div>
//         <NavLinks customClass={"hidden md:flex"} />

//         <button
//           onClick={handleNav}
//           className="flex items-center justify-center md:hidden h-12 w-12 z-30"
//         >
//           {navExpanded ? (
//             <XMarkIcon className="h-9 w-9 text-primary" />
//           ) : (
//             <Bars3Icon className="h-9 w-9 text-primary" />
//           )}
//         </button>
//         {/* {navExpanded && (
//           <>
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setNavExpanded(false);
//               }}
//               className="fixed inset-0 h-full w-full bg-dark/30 z-10 md:hidden"
//             ></div>

//             <div className="fixed h-full w-full right-0 top-0 bottom-0 max-w-[280px] z-20 transition-all ease-in-out duration-300">
//               <div className="flex flex-col justify-center items-center py-24 w-full h-full ml-auto bg-section-gradient overflow-auto md:hidden transform">
//                 <NavLinks
//                   customClass={"md:hidden flex-col !p-0"}
//                   linksCustomClass={"flex-col [&>li]:w-fit [&>li]:mx-auto"}
//                 />
//               </div>
//             </div>
//           </>
//         )} */}
//         <div
//           onClick={(e) => {
//             e.stopPropagation();
//             setNavExpanded(false);
//           }}
//           className={`fixed inset-0 h-full w-full bg-dark/30 z-10 md:hidden ${
//             navExpanded ? "translate-x-0" : "translate-x-full"
//           } transition-allssss transform-gpu ease-in-out duration-300`}
//         ></div>

//         <div
//           className={`fixed h-full w-full right-0 top-0 bottom-0 max-w-[280px] z-20 ${
//             navExpanded ? "translate-x-0" : "translate-x-full"
//           } transition-allssss transform-gpu ease-in-out duration-300`}
//         >
//           <div className="flex flex-col justify-center items-center py-24 w-full h-full ml-auto bg-section-gradient overflow-auto md:hidden transform">
//             <NavLinks
//               customClass={"md:hidden flex-col !p-0"}
//               linksCustomClass={"flex-col [&>li]:w-fit [&>li]:mx-auto"}
//             />
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

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
//       class={`${customClass} max-w-3xl text-base text-black md:text-xl mx-auto text-center undefined`}
//     >
//       {children}
//     </p>
//   );
// };

// SectionHead.titleHint = titleHint;
// SectionHead.Title = Title;
// SectionHead.Description = Description;
