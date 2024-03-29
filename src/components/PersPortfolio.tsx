import React from "react";
import styles from "../style";
import { Collapsible } from './Reusables/Collapsible';
import { Printing, DIYProjects, ProgProjects, Piano } from "./Experience";

function PersPortfolio() {
    return (
        <div className={`${styles.mainSection}`}>
            <div className={`${styles.heroTitles}`}>Welcome To My Personal Portfolio!</div>
            <div className={`${styles.heroContent}`}>
                On this page I will showcase the projects I do in my spare time, as well as some of my hobbies and interests.
            </div>
            <Collapsible title="DIY Projects" content={
                <DIYProjects />
            } />
            <Collapsible title="3D Printing" content={
                <Printing />
            } />
            <Collapsible title="Piano" content={
                <Piano />
            } />
            <Collapsible title="Programming Projects" content={
                <ProgProjects />
            } />
        </div>
    );
}

export default PersPortfolio;