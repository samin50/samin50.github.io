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
            <CarouselCustom slide={true} className={styles.carouselStyle} imgList={["Professional/Jacobs/image021.png", "Professional/Jacobs/image024.png"]}/>
            {/* <div className="py-3 prose">
                I was tasked with creating a tool that would allow the user to scrape data from a website and export it to a CSV file.
            </div> */}
            </>
        } badges={ ["Webscraping", "Python", "UI"]}/>
        <ProjectDesc title="Twitter Sentiment Analysis" content={
            <>
            <CarouselCustom slide={true} className={styles.carouselStyle} imgList={["Professional/Jacobs/image032.jpg", "Professional/Jacobs/image033.jpg"]}/>
            </>
        } badges={ ["Twitter API", "PowerBI", "NLP", "Big Data"]}/>
        </>
    );
}


export default Jacobs;