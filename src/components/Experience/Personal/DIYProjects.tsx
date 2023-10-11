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
            For my Casio CDP-S350, I wanted to add some reactive LEDs that would trigger on note presses as seen through some YouTube videos (though those are typically done in post).
            To accomplish this, I used a Raspberry Pi Zero and a wired MIDI connection to my piano. I attached a strip of WS2812B LEDs along the notes of the piano, and used
            <a className="text-blue-400" href="https://github.com/onlaj/Piano-LED-Visualizer"> this</a> program to control the LEDs. I added to this by forking the code and adding
            a few features, such as simultaneous wireless MIDI output to my laptop to enable another visualiser to be used, as can be seen in my piano videos.
            </>
        } badges={
            ["Raspberry Pi", "Linux", "Soldering", "3D Printing", "Python"]
        }/>
        <ProjectDesc title="Ambient Monitor LED Lighting" content={
            <>
            In the same vein as the above project, I wanted to add reactive LEDs to my monitor that would dynamically change colour based on the colours on the screen.
            I used a Raspberry Pi Zero and a HDMI capture device to capture the screen, and attached strips of WS2812B LEDs to the back of my monitor. I used
            the open source program <a className="text-blue-400" href="https://github.com/hyperion-project/HyperBian">Hyperion</a> to control the LEDs.
            </>
        } badges={
            ["Raspberry Pi", "Linux", "Soldering", "Python"]
        }/>
        <ProjectDesc title="Piano Storage Solution" content={
            <>
            I wanted to be able to store my piano in a way that would not take up too much space, but also remain easily acceessible. I found that I did not play piano as much as I would like to
            because I would keep having to lift it off from the ground and pivot it onto my desk which was quite a hassle. <br />
            I decided to make a storage solution that would allow me to store
            the piano directly under my monitor so I can simply slide it out and play whenever I want. I designed the stand in SketchUp, bought a single large piece of 18mm MDF and rebar to 
            reinforce the structure, and cut the pieces out using a jigsaw. I assembled the stand using screws and finished the sides with U-shaped edge trim.
            </>
        } badges={
            ["Woodworking", "Metal-Working", "CAD"]
        }/>
        <ProjectDesc title="Loft Conversion" content={
            <>
            My brother and I share a room at my parents house, so I decided to convert our loft into a bedroom for myself. I modelled the room in SketchUp, and bought the materials after
            conducting thorough research. I have done mostly everything myself, from reinforcing the floor to installing the insulation and electrical wiring. This project is still WIP as 
            I am still in my 4th year at university, and I do not live at home during term time.
            </>
        } badges={
            ["Woodworking", "Construction", "CAD"]
        }/>
       </div>
    );
}


export default DIYProjects;