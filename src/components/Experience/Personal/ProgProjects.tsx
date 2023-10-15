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
       <ProjectDesc title="Portfolio Website and CV" content={
            <>
            This website is a project in and of itself! I have been working on it on and off since my 3rd Year at University, and I have been using it as a way to learn React,  TailwindCSS and HTML.
            My <a className={styles.hyperlink} href="https://github.com/samin50/CV">CV</a> is also written HTMl and TailwindCSS, and is hosted on Github Pages.
            </>
        } badges = {
            ["UI", "HTML", "CSS", "TailwindCSS", "React"]
        }/>
        <ProjectDesc title="Logic Gate Simulator and Simplifier" content={
            <>
            For my Computer Science A-Level NEA, I developed a logic gate simulator and simplifier in Python. It was a very interesting project, and I learnt a lot about Boolean Algebra and how to implement it in code.
            I picked this project because I have always had a fascination with how computers work, and I wanted to demonstrate my understanding in an interactive way. <br />
            The project was able to derive the Boolean Expression of any created circuit and simplify it using the Quine-McCluskey Algorithm. The project was also able to simulate the circuit, and display the output of the circuit for any given input
            in truth tables. The circuits could be saved and loaded to a proprietary file format, and was my first experience with UI design.
            </>
        } badges = {
            ["Python", "UI", "Optimisation", "Boolean Algebra", "Data Structures", "Quine-McCluskey Algorithm"]
        }/>
       </>
    );
}


export default ProgProjects;