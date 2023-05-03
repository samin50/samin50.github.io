import React from "react";
import styles from "../style";

function HeroBite() {
    return (
        <div className="w-full p-3 md:w-3/4 dark:bg-primarydark bg-primary dark:text-textdark text-textlight flex flex-col" style={{ height: '3000px'}}>
            <div className={`${styles.heroTitles} pt-0`}>Hi! I'm Shaheen!</div>
            <div className={styles.heroContent}>Content...</div>
            <div className={styles.heroTitles}>About Me</div>
            <div className={styles.heroContent}>Content...</div>
            <div className={styles.heroTitles}>Some Easy to Digest Statistics...</div>
            <div className={styles.heroContent}>Content...</div>
            
        </div>
    );
}


export default HeroBite;