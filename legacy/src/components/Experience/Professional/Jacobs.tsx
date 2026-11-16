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
            <CarouselCustom slide={true} className={styles.carouselStyle} imgList={["Professional/Jacobs/image021.png", "Professional/Jacobs/image032.jpg", "Professional/Jacobs/image033.jpg"]}/>
            <div className="prose">
                <h2>Web Scraper</h2>
                I was asked to develop a tool that would scrape the data off websites from a single domain, each website uniquely identified by an ID, and condense it into an Excel spreadsheet 
                (a CSV file) to ease the workload off my peers who would have otherwise manually gone through the websites and collected the data themselves. The frontend was a Tkinter-based GUI 
                and the program reached a peak speed of 120 websites/minute, but was manually reduced to prevent overloading the server. This endeavor taught me how to use Python to parse HTML 
                code and extract the necessary information as well as how to interface with CSV files. Additionally, I improved my skills on UI and UX design as ease of use remained a priority 
                when developing this program.
                <h2>Power BI Sentiment Analysis</h2>
                was asked to use Twitter's API to find how the public feels about a certain topic or keyword - the program would grab all tweets that contained this keyword and would analyse 
                the 'sentiment' of the Tweet (either judging it to be positive, negative or neutral), and would record the results and information into a database. Using this information, 
                I could deduct the public's overall feeling or 'sentiment' towards any one entity. The program was to be hosted on AWS. For the frontend, I was told to use Microsoft's PowerBI. 
                This was my first encounter with any form of Natural Language Processing, PowerBI and Big Data (any one keyword could have millions of entries), and I quickly developed the 
                skills required to work with them.
            </div>
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