import React from "react";
import styles from "../../../style";
import { Collapsible } from '../../Reusables/Collapsible';
import { ProjectDesc } from "../../Reusables/ProjectDesc";

function ProgProjects() {
    return (
       <>
       <div className="pb-3">
            I have always been interested in programming, and I have been teaching myself since I was around 10. I have worked on many projects, some of which I will showcase here.
       </div>
        <ProjectDesc title="Logic Gate Simulator and Simplifier" content={
            <>
            </>
        } badges = {
            ["Python", "UI", "Optimisation", "Boolean Algebra"]
        }/>
       </>
    );
}


export default ProgProjects;