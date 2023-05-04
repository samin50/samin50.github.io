import React from "react";
import styles from "../style";

function Hero() {
    return (
        <div className={`${styles.mainSection}`}>
            <div className={`${styles.heroTitles}`}>Hi! I'm Shaheen!</div>
            <div className={styles.heroContent}>Content...</div>
            <div className={styles.heroTitles}>About Me</div>
            <div className={styles.heroContent}>Content...</div>
            <div className={styles.heroTitles}>Some Easy to Digest Statistics...</div>
            <div className={styles.heroContent}>Content...</div>
        </div>
    );
}


export default Hero;