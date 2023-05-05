import { CSSProperties } from "react";

const styles = {
  navbarTitleActive : "border-none focus:outline-none bg-transparent block py-2 pl-3 pr-4 rounded md:p-0 dark:text-secondarydark text-secondary",
  navbarTitleInactive : "border-none focus:outline-none bg-transparent block py-2 pl-3 pr-4 text-textlight md:p-0 dark:text-textdark dark:hover:text-tertiarydark hover:text-tertiary transition duration-300 ease-in-out",
  navbarDropdownMenu: " border-none focus:outline-none flex items-center justify-between w-full block px-4 py-2 text-textlight dark:text-textdark hover:bg-secondary dark:hover:bg-secondarydark bg-primary rounded-md dark:bg-primarydark dark:hover:text-textdark hover:bg-tertiary hover:text-primary",
  sidebarTitles: "pt-3 font-semibold text-xl",
  sidebarContent: "pt-3 text-md",
  mainSection : "w-full p-3 pt-0 md:w-3/4 dark:text-textdark text-textlight flex flex-col min-h-screen",
  heroTitles : "text-xl md:text-3xl font-semibold pt-5 bg-transparent",
  heroContent : "md:text-lg font-md bg-transparent",
};

// Add this to your styles.tsx file
export const summaryNoArrow: CSSProperties = {
  listStyle: "none",
  outline: "none",
} as any;

export default styles;
  