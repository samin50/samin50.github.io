import React from "react";
import styles from "../style";

function NavbarBite() {
  return (
    <nav className="bg-primary border-tertiary dark:bg-primarydark dark:border-secondarydark border-b-[3px] sticky top-0">
       {/* Dark Mode button */}
       <button id="theme-toggle" type="button" className="absolute right-16 md:right-72 md:top-5 top-4 focus:outline-none border-tertiary hover:border-secondary text-textlight dark:text-textdark rounded-lg text-sm p-2.5">
            <svg id="theme-toggle-dark-icon" className="hidden w-4 h-auto items-center" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg id="theme-toggle-light-icon" className="hidden w-4 h-auto items-center" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
      <div className="w-screen flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Top left information */}
        <div className="flex items-center">
            <svg fill="none" stroke="currentColor" className="w-10 md:w-12 h-auto mr-3 stroke-secondary dark:stroke-secondarydark" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"></path>
            </svg>
            <div className="flex flex-col">
              <div className="text-textlight dark:text-textdark font-bold text-sm/4 md:text-xl/4 py-0">Shaheen Amin</div>
              <div className="text-textlight dark:text-textdark text-xs/4 md:text-base py-0">Engineer, Programmer and DIY Enthusiast</div>
            </div>
        </div>
        {/* Hamburger icon on small screen */}
        <button data-collapse-toggle="navbar-multi-level" type="button" className="border-none inline-flex items-center bg-transparent p-2 ml-3 text-sm text-textlight dark:text-textdark md:hidden focus:outline-none focus:ring-tertiary dark:focus:ring-tertiarydark" aria-controls="navbar-multi-level" aria-expanded="false">
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        {/* Navbar items, shown on larger screens */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
          <ul className="flex flex-col font-medium p-3 md:p-0 mt-2 border rounded-md bg-primary md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-primary dark:bg-primarydark md:dark:bg-primarydark dark:border-secondary">
            <li>
              <a href="#" className={styles.navbarTitleActive} aria-current="page">Home</a>
            </li>
            {/* Dropdown menu */}
            <li>
                {/* Parent container for the dropdown button */}
                <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className={`flex items-center justify-between w-full ${styles.navbarTitleInactive}`}>Portfolio <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                <div id="dropdownNavbar" className="z-10 hidden font-normal bg-primary rounded-lg shadow w-44 dark:bg-secondary">
                    <ul className="py-2" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a href="#" className={styles.navbarDropdownMenu}>Professional <svg className="w-4 h-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" stroke-width="0"><path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg></a>
                      </li>
                      <li>
                        <a href="#" className={styles.navbarDropdownMenu}>Personal <svg className="w-4 h-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" stroke-width="0"><path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg></a>
                      </li>
                    </ul>
                </div>
            </li>
            <li>
              <a href="#" className={styles.navbarTitleInactive}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarBite;
