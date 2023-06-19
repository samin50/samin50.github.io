import React from "react";
import styles from "../style";
import GitHubCalendar from 'react-github-calendar';
import { CarouselCustom } from "./Reusables/CarouselCustom";

function Hero() {
    return (
        <div className={`${styles.mainSection}`}>
            <div className={`${styles.heroTitles}`}>Hi! I'm Shaheen!</div>
            <div className={styles.heroContent}>
                Thank you for visiting my page! I am currently a 3rd Year <strong>Electronics and Information Engineering</strong> student at <strong>Imperial College London.</strong> <br />
                On this website you will see some of the projects I have worked on <strong>(this page itself being one of those projects!)</strong>, as well as some of my interests and hobbies.
                I started my Engineering/Computer Science journey when I was <strong>10, learning Java</strong> in order to develop add-ons for the now popular game, Minecraft.
                Ever since, I have been on the persuit of constant learning and self-improvement, which is reflected in my projects and many hobbies.
            </div>            
            <div className="py-3">
                <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
            </div>
            <div className={styles.heroContent}>
                My current setup is a <strong>Legion 7 5950HX with a 3080</strong>, which I use for both work, gaming and AI work; the RTX 3080 with 16GB VRAM has proven very useful for this.
                I regularly <strong>play piano</strong>, and I have outfitted it and my monitor with reactive LEDs (all of which you can see in my <strong>Personal Portfolio</strong> section!).
                My desk is also equipped with my <strong>custom built DIY storage solution</strong> that houses my piano and mounts my monitor, that I personally built out of MDF and some rebar.
                To the left of my desk I have my <strong>3D Printer</strong> that I use for prototyping and personal projects, and have upgraded myself by <strong>flashing Linux on an old Android TV Box and installing Klipper.</strong>
            </div>
            <div className={styles.heroTitles}>Some Easy to Digest Statistics...</div>
            <div className="mt-2 text-xl md:text-lg underline cursor-pointer">Github Contributions</div>
            <div className="m-3 ml-0 p-3 rounded-lg flex justify-center brightness-[1.0] dark:brightness-[0.8] bg-black bg-opacity-10">
                <GitHubCalendar username="samin50" />
            </div>
            <div className={styles.heroContent}> Unfortunately at work I have been using BitBucket instead of Github so the activity graph looks quite sparse :)</div>
            <div className="my-2 text-xl md:text-lg underline cursor-pointer">Leetcode Stats</div>
            <div className="flex rounded-lg justify-center p-3 w-full brightness-[1.0] dark:brightness-[0.8] bg-black bg-opacity-10">
                <img className="h-100" src="https://leetcard.jacoblin.cool/samin50?ext=activity" alt="Leetcode Stats" />
            </div>
        </div>
    );
}

export default Hero;