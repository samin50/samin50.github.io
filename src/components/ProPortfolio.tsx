import React from "react";
import styles from "../style";
import { Collapsible } from './Reusables/Collapsible';
import { Amadeus, Imperial, Jacobs } from "./Experience";

function ProPortfolio() {
    return (
        <div className={`${styles.mainSection}`}>
            <div className={`${styles.heroTitles}`}>Welcome To My Professional Portfolio!</div>
            <div className={`${styles.heroContent}`}>
                On this page I will showcase some of my formal work and experience.
            </div>
            <Collapsible title="Experience: Amadeus" content={
                <Amadeus />
            } />
            <Collapsible title="Experience: Imperial College London" content={
                <Imperial />
            } />
            <Collapsible title="Experience: Jacobs" content={
                <Jacobs />
            } />
        </div>
    );
}


export default ProPortfolio;