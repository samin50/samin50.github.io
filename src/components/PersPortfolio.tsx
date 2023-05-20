import React from "react";
import styles from "../style";
import { Collapsible } from './Collapsible';
import { Projects, Piano } from "./Experience";

function PersPortfolio() {
    return (
        <div className={`${styles.mainSection}`}>
            <div className={`${styles.heroTitles}`}>Welcome To My Personal Portfolio!</div>
            <div className={`${styles.heroContent}`}>Content...</div>
            <Collapsible title="Projects" content={
                <Projects />
            } />
            <Collapsible title="Piano" content={
                <Piano />
            } />
        </div>
    );
}

export default PersPortfolio;