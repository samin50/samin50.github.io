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
            </>
        } badges = {
            []
        }/>
        </>
    );
}


export default Piano;