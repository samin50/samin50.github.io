import React from "react";
import styles from "../style";
import GitHubCalendar from 'react-github-calendar';
import { CarouselCustom } from "./Reusables/CarouselCustom";

function Hero() {
    return (
        <div className={`${styles.mainSection}`}>
            <div className={`${styles.heroTitles}`}>Hi! I'm Shaheen!</div>
            <div className={styles.heroContent}>
                Thank you for visiting my website! I am currently a 4th Year Electronics and Information Engineering student at Imperial College London. <br />
                On this website you will see some of the projects I have worked on (this page itself being one of those projects!), as well as some of my interests and hobbies.
                I started my Engineering/Computer Science journey when I was 10, learning Java in order to develop add-ons (known as mods) for the now popular game, Minecraft.
                Ever since, I have been on the persuit of constant learning and self-improvement, which is reflected in my projects and many hobbies.
            </div>            
            <div className="flex justify-center">
                <div className="py-3 w-3/4">
                    <CarouselCustom className="h-96" slide={true} imgList={["Desk.jpg", "Printer.jpg"]}/>
                </div>
            </div>
            <div className={styles.heroContent}>
                My current setup is a Legion 7 5950HX with a 3080, which I use for both work, gaming and AI work; the RTX 3080 with 16GB VRAM has proven very useful for this.
                I regularly play piano, and I have outfitted it and my monitor with reactive LEDs (all of which you can see in my Personal Portfolio section!).
                My desk is also equipped with my custom built DIY storage solution that houses my piano and mounts my monitor, that I personally built out of MDF and some rebar.
                To the left of my desk I have my 3D Printer that I use for prototyping and personal projects, and have upgraded myself by flashing Linux on an old Android TV Box and installing Klipper.
            </div>
            <div className={styles.heroTitles}>Some Easy to Digest Statistics...</div>
            <div className="mt-2 text-xl md:text-lg underline cursor-pointer">Github Contributions</div>
            <div className="m-3 ml-0 p-3 rounded-lg flex justify-center brightness-[1.0] dark:brightness-[0.8] bg-black bg-opacity-10">
                <GitHubCalendar username="samin50" />
            </div>
            <div className={styles.heroContent}>
                Unfortunately during my placement this year I have been using BitBucket instead of Github so the activity graph looks quite sparse :)
                A lot of these commits are of me making small changes to my website, or working on my personal projects.
                </div>
            {/* <div className="my-2 text-xl md:text-lg underline cursor-pointer">Leetcode Stats</div>
            <div className="flex rounded-lg justify-center p-3 w-full brightness-[1.0] dark:brightness-[0.8] bg-black bg-opacity-10">
                <img className="h-100" src="https://leetcard.jacoblin.cool/samin50?ext=activity" alt="Leetcode Stats" />
            </div> */}
        </div>
    );
}

export default Hero;