import { CSSProperties } from "react";

const styles = {
  navbarTitleActive : "text-2xl md:text-base border-none focus:outline-none bg-transparent block py-2 pl-3 pr-4 rounded md:p-0 dark:text-secondarydark text-secondary",
  navbarTitleInactive : "text-2xl md:text-base w-full text-left border-none focus:outline-none bg-transparent block py-2 pl-3 pr-4 text-textlight md:p-0 dark:text-textdark dark:hover:text-tertiarydark hover:text-tertiary transition ease-in-out",
  navbarDropdownMenu: "text-xl md:text-base border-none focus:outline-none flex items-center justify-between w-full block px-4 py-2 text-textlight dark:text-textdark hover:bg-secondary dark:hover:bg-secondarydark bg-primary rounded-md dark:bg-primarydark dark:hover:text-textdark hover:bg-tertiary hover:text-primary",
  sidebarTitles: "pl-0 md:pl-4 pt-4 pb-0 font-semibold md:text-2xl text-3xl ml-2 md:ml-0",
  sidebarContent: "md:pl-6 pl-2 pt-0 pb-0 md:text-sm text-xl",
  mainSection : "p-3 pt-0 dark:text-textdark text-textlight flex flex-col min-h-screen w-full",
  heroTitles : "text-5xl md:text-3xl font-semibold pt-5 bg-transparent",
  heroContent : "md:text-sm bg-transparent mt-2 text-xl",
  contactHeadings : "font-semibold pt-5 pl-1",
  formEntries: "mt-2 focus:ring-0 shadow-sm text-sm rounded-lg border-secondary dark:border-secondarydark bg-primary dark:bg-primarydark brightness-90 dark:placeholder-textdark placeholder-opacity-70 placeholder-textlight border-2 ring-none w-full p-2.5",
  badge: "py-1 px-3 m-1 rounded-full text-lg md:text-xs font-medium hover:border-cyan-400 border-cyan-500 dark:hover:border-cyan-300 dark:border-cyan-600 border-[2px] text-textlight dark:text-textdark",
  carouselStyle : "h-72",
  iconStyles : "h-8 w-8 md:h-5 md:w-5",
};

// Add this to your styles.tsx file
export const summaryNoArrow: CSSProperties = {
  listStyle: "none",
  outline: "none",
} as any;

export default styles;
  