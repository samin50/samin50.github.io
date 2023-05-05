import React from "react";
import styles from "../style";
import { Collapsible } from './Collapsible';

function PersPortfolio() {
    return (
        <div className={`${styles.mainSection}`}>
            <div className={`${styles.heroTitles}`}>Welcome To My Personal Portfolio!</div>
            <div className={`${styles.heroContent}`}>Content...</div>
            <Collapsible title="Projects" content={
                <div>Content...</div>
            } />
            <Collapsible title="Piano" content={
                <div>Content...</div>
            } />
        </div>
    );
}

export default PersPortfolio;