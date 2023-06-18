import React from "react";
import styles from "../../../style";
import CarouselCustom from "../../Reusables/CarouselCustom";
import { ProjectDesc } from "../../Reusables/ProjectDesc";

function Jacobs() {
    return (
       <>
       <div className="py-3">
            In summer 2019 at 17, I worked with Jacobs for a month as a Software Engineering intern.
            This was my first experience working in a professional environment and I learnt a lot about the industry.
            
        </div>
        <ProjectDesc title="Webscraping Tool" content={
            <>
            <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
            </>
        } badges={ ["Webscraping", "Python", "UI"]}/>
        <ProjectDesc title="Twitter Sentiment Analysis" content={
            <>
            <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
            </>
        } badges={ ["Twitter API", "PowerBI", "NLP", "Big Data"]}/>
        </>
    );
}


export default Jacobs;