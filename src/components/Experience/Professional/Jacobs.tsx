import React from "react";
import styles from "../../../style";
import CarouselCustom from "../../Reusables/CarouselCustom";
import { ProjectDesc } from "../../Reusables/ProjectDesc";

function Jacobs() {
    return (
       <>
       <div className="py-3">
            In the summer of 2019, at 17, I worked with Jacobs for a month as a Software Engineering intern.
            This was my first experience working in a professional environment and I learnt a lot about the industry.
            
        </div>
        <ProjectDesc title="Project 1" content={
            <>
            <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
            </>
        } badges={ ["Hi"]}/>
        <ProjectDesc title="Project 2" content={
            <>
            <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
            </>
        } badges={ ["Hi"]}/>
        </>
    );
}


export default Jacobs;