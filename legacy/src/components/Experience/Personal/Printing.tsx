import React from "react";
import styles from "../../../style";
import { Collapsible } from '../../Reusables/Collapsible';
import { ProjectDesc } from "../../Reusables/ProjectDesc";

function Printing() {
    return (
    <>
        <div className="pb-3">
            After the end of my first year of University, I felt a lot more confident in my skills and learning ability,
            so I decided to buy a used Voxelab Aquila C2 off eBay. I have always been interested in physically making things, and
            3D printing opened the door to a whole new world of possibilities. By this point I had basic CAD skills from GCSE
            Design and Technology, so I felt that I could begin quickly. I have since printed many things, mainly functional,
            but some decorative. I have also designed and printed a few things myself, and I will showcase them here.
        </div>
        <ProjectDesc title="Printer Upgrades" content={
            <>
            I have upgraded my printer with a few things, namely a repurposed "Android TV Box" running Linux and Klipper, a BLTOUCH, a metal hotend,
            dual-gear extruder, and various other 3D printed parts.
            </>
        } badges = {
            []
        }/>
        <ProjectDesc title="Functional Prints" content={
            <>
            I primarily use my printer for functional prints, such as for my personal projects, or for my desk setup. I will showcase some of them here.
            </>
        } badges = {
            []
        }/>
         <ProjectDesc title="Decorative Prints" content={
            <>
            I have also printed some decorative prints, usually for other people. I will showcase some of them here.
            </>
        } badges = {
            []
        }/>

    </>
    );
}


export default Printing;