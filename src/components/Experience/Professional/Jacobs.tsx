import React from "react";
import styles from "../../../style";
import CarouselCustom from "../../Reusables/CarouselCustom";
import { ProjectDesc } from "../../Reusables/ProjectDesc";

function Jacobs() {
    return (
       <>
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