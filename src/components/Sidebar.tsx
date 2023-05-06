import React, { useState } from 'react';
import styles, { summaryNoArrow } from "../style";

function Sidebar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const handleSidebarClick = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <div className={`${isSidebarVisible ? 'w-1/4' : 'hidden'} w-11/12 md:w-1/4 md:block border-secondary dark:border-secondarydark border-r-[3px] flex flex-col`}>
                {/* Image border container */}
                <div className="p-4">
                    {/* Profile pic */}
                    <img src="../assets/NA.jpg" alt="Picture of me!" className="dark:border-secondarydark border-secondary border-[3px]"/>
                    <div className={styles.sidebarTitles}>Details</div>
                    <div className={styles.sidebarTitles}>Education</div>
                    <div className={styles.sidebarTitles}>Interests</div>
                    <div className={styles.sidebarTitles}>Contact</div>
                </div>
            </div>
            <div className="md:hidden fixed h-full flex items-end pb-20 pl-3 dark:border-secondarydark border-secondary">
                <button className="dark:border-tertiarydark border-tertiary border-[3px] opacity-30 hover:opacity-100 transition-opacity 500 p-0 rounded-full focus:outline-none" onClick={handleSidebarClick}>
                    <svg className="w-12 h-auto stroke-secondary dark:stroke-secondarydark fill-none" xmlns="http://www.w3.org/2000/svg" viewBox="-2.4 -2.4 28.8 28.8"><g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M21.97 15V9c0-5-2-7-7-7h-6c-5 0-7 2-7 7v6c0 5 2 7 7 7h6c5 0 7-2 7-7ZM7.97 2v20"/><path d="M14.97 9.44 12.41 12l2.56 2.56"/></g></svg>
                </button>
            </div>
        </>
    );
}


export default Sidebar;