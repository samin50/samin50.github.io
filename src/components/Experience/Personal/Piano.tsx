import React from "react";
import styles from "../../../style";
import { Collapsible } from '../../Reusables/Collapsible';
import { ProjectDesc } from "../../Reusables/ProjectDesc";

function Piano() {
    return (
        <> 
        <div className="pb-3">
            I have been playing piano on and off since I was around 13, but I have never had any formal training;
            after begging my parents for a keyboard, I taught myself how to play. I have always been interested in music,
            and to this day I do not consider myself a good pianist, but I do enjoy playing. I hope you enjoy some of my
            recordings!
        </div>
        <ProjectDesc title="Attack on Titan OSTs" content={
            <>
            Over the last couple of years I have become a large fan of the Attack on Titan series written by Hajime Isayama, and 
            coincidentally I have only really picked up piano in the last couple of years, so I naturally gravitated towards learning
            some of the OSTs from the series. I have recorded a few of them, and I hope you enjoy them!
            <div className="py-3 prose">
                <ProjectDesc title="Call of Silence" content={
                    <div className="h-72">
                        <video className="mx-auto h-full max-w-full" controls>
                            <source src="Personal/Piano/CallOfSilenceSample.mp4"></source>
                        </video>
                    </div>
                } badges= {[]}/>
            </div>
            </>
        } badges = {[]}/>
        </>
    );
}


export default Piano;