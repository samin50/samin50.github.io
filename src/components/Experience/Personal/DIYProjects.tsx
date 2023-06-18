import React from "react";
import styles from "../../../style";
import { Collapsible } from '../../Reusables/Collapsible';
import { ProjectDesc } from "../../Reusables/ProjectDesc";

function DIYProjects() {
    return (
       <div>
        <div className="pb-3">
            I have always been fascinated by the idea of making things with my own hands. I have a few projects that I have worked on in my spare time, and I will showcase them here.
        </div>
        <ProjectDesc title="Piano LEDs" content={
            <>
            </>
        } badges={
            ["Raspberry Pi", "Linux", "Soldering", "3D Printing", "Python"]
        }/>
        <ProjectDesc title="Ambient Monitor LED Lighting" content={
            <>
            </>
        } badges={
            ["Raspberry Pi", "Linux", "Soldering"]
        }/>
        <ProjectDesc title="Piano Storage Solution" content={
            <>
            </>
        } badges={
            ["Woodworking", "MDF", "CAD"]
        }/>
       </div>
    );
}


export default DIYProjects;