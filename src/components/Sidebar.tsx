import React, { useState } from 'react';
import styles from "../style";

function Sidebar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const handleSidebarClick = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <div className={`${isSidebarVisible ? '' : 'hidden'} md:block md:w-2/5 fixed md:static min-h-min z-10 w-screen h-screen`}>
                <div className='bg-black bg-opacity-30 h-full md:w-full'>
                    <div className="md:block md:shadow-none md:w-full h-full w-3/4 shadow-lg border-secondary dark:border-secondarydark border-r-[3px] fixed md:static bg-primary dark:bg-primarydark transition-colors 1000 ease-in-out">
                        {/* Image border container */}
                        <div className="flex flex-row md:flex-col">
                            {/* Profile pic */}
                            <div className='p-3 w-2/5 md:w-full'>
                                <img src="assets/NAImage.jpg" alt="Picture of me!" className=" dark:border-secondarydark border-secondary border-[3px] w-full"/>
                            </div>
                            <div className='flex-row'>
                                <div className={styles.sidebarTitles}>Details</div>
                                <div className={styles.sidebarContent}></div>
                                <div className={styles.sidebarTitles}>Education</div>
                                <div className={styles.sidebarContent}></div>
                                <div className={styles.sidebarTitles}>Interests</div>
                                <div className={styles.sidebarContent}></div>
                                <div className={styles.sidebarTitles}>Contact</div>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
            {/* Sidebar button */}
            <div className='block md:hidden fixed bottom-2 left-2 z-30'>
                <button className="z-10 focus:outline-none dark:border-secondarydark border-secondary hover:border-secondary dark:hover:border-secondarydark border-[3px] opacity-50 hover:opacity-100 transition-opacity 500 p-0 rounded-full bg-transparent" onClick={handleSidebarClick}>
                    <svg className="w-[100px] stroke-secondary dark:stroke-secondarydark fill-none" xmlns="http://www.w3.org/2000/svg" viewBox="-2.4 -2.4 28.8 28.8"><g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M21.97 15V9c0-5-2-7-7-7h-6c-5 0-7 2-7 7v6c0 5 2 7 7 7h6c5 0 7-2 7-7ZM7.97 2v20"/><path d="M14.97 9.44 12.41 12l2.56 2.56"/></g></svg>
                </button>
            </div>
        </>
    );
}


export default Sidebar;