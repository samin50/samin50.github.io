import React from "react";
import styles from "../style";
import { Collapsible } from './Collapsible';

function ProPortfolio() {
    return (
        <div className={`${styles.mainSection}`}>
            <div className={`${styles.heroTitles}`}>Welcome To My Profesional Portfolio!</div>
            <div className={`${styles.heroContent}`}>Content...</div>
            <Collapsible title="Experience: Amadeus" content={
                <div>Content...</div>
            } />
            <Collapsible title="Experience: Imperial College" content={
                <div>Content...</div>
            } />
            <Collapsible title="Experience: Jacobs" content={
                <div>Content...</div>
            } />
        </div>
    );
}


export default ProPortfolio;