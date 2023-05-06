import React, { useState } from 'react';
import styles from "../style";

function Sidebar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const handleSidebarClick = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <div className={`${isSidebarVisible ? '' : 'hidden'} md:block md:w-1/4 border-secondary dark:border-secondarydark border-r-[3px]`}>
                {/* Image border container */}
                <div className="flex flex-row md:flex-col">
                    {/* Profile pic */}
                    <div className='p-3 w-1/2 md:w-full'>
                        <img src="assets/NAImage.jpg" alt="Picture of me!" className=" dark:border-secondarydark border-secondary border-[3px]"/>
                    </div>
                    <div className='flex-row'>
                        <div className={styles.sidebarTitles}>Details</div>
                        <div className={styles.sidebarTitles}>Education</div>
                        <div className={styles.sidebarTitles}>Interests</div>
                        <div className={styles.sidebarTitles}>Contact</div>
                    </div>        
                </div>
            </div>
            {/* Sidebar button */}
            <div className='md:hidden fixed h-full flex items-end pb-20 pl-3'>
                <div className='w-1/2'>
                    <button className="dark:border-secondarydark border-secondary border-[3px] opacity-20 hover:opacity-100 transition-opacity 500 p-0 rounded-full focus:outline-none bg-transparent" onClick={handleSidebarClick}>
                        <svg className="w-20 h-auto stroke-secondary dark:stroke-secondarydark fill-none" xmlns="http://www.w3.org/2000/svg" viewBox="-2.4 -2.4 28.8 28.8"><g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M21.97 15V9c0-5-2-7-7-7h-6c-5 0-7 2-7 7v6c0 5 2 7 7 7h6c5 0 7-2 7-7ZM7.97 2v20"/><path d="M14.97 9.44 12.41 12l2.56 2.56"/></g></svg>
                    </button>
                </div>
            </div>
        </>
    );
}


export default Sidebar;