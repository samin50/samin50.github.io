import React from "react";
import styles from "../../../style";
import { Collapsible } from '../../Reusables/Collapsible';
import { ProjectDesc } from "../../Reusables/ProjectDesc";
import { CarouselCustom } from "../../Reusables/CarouselCustom";

function Imperial() {
    return (
       <>
            {/* Embedded Systems */}
            <ProjectDesc title="Embedded Systems" content = {
                <>
                    <ProjectDesc title="Automated Pet Feeder" content = {
                        <>
                        <CarouselCustom className={styles.carouselStyle} imgList={ ["NAImage.jpg", "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1", "sampleVideo.mp4"] }/>
                        <div className="prose">
                            <h2>Description</h2>
                            In this project, I designed and built an automated pet feeder using a 3D printer and CAD software (SketchUp, I later use FreeCAD for hobby projects). 
                            The feeder is controlled by a web app, which allows the user to schedule feeding times and portion sizes.
                            The project was built using a Raspberry Pi, a stepper motor, a load cell, and a 3D printer. 
                            The backend for the web app was written with FasdtAPI in Python and the Frontend was written with VueJS.
                            The backend stores data in JSON format and sends it to the MQTT broker (Mosquitto) which is subscribed to by the Raspberry Pi, 
                            allowing it to check the feeding schedule. <br />
                            <h2>My Role</h2>
                            As I was the only team member with CAD and 3D Printing experience (from my hobbies), I was solely responsible for the aesthetic and mechanical design of the feeder.
                            I also took on the role of project manager, and was responsible for the planning and organisation of the project.
                            The main difficulty I faced was incorporating the load cell into the dispensing mechanism - I had to account for the 
                            relatively weak servo motor and had to ensure the accuracy of the load cell as the uantites of food dispensed were only a few grams at most. <br />
                            I came up with a design that securely mounted the load cell to plate beneath the dispensing platform, which rotated with the servo motor to dispense food.
                            The dispensing platform could be decoupled from the servo motor, to ensure that the load cell can obtain an accurate reading.
                            For fun, I also decided to implement a Computer Vision model and integrate it into the front-mounted camera to identify whether the pet to be fed was a dog or cat so the feeder 
                            would know if the correct pet had come to feed. <br />
                            I greatly enjoyed this project as I was able to apply and improve my hobbyist CAD and 3D printing skills to a real-world problem.
                        </div>
                        </>
                    } badges = { ["3D Printing", "CAD", "Raspberry Pi", "Python", "Concurrent Programming"] } />
                    <ProjectDesc title="Synthesiser" content = {
                        <>
                        <CarouselCustom className={styles.carouselStyle} imgList={ ["NAImage.jpg", "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1", "sampleVideo.mp4"] }/>
                        <div className="prose">
                            <h2>Description</h2>
                            In this project, I programmed an STM32 microcontroller to synthesise music in PlatformIO written in C++.
                            All the music was synthesised in real time, and the user could select from a variety of wave types and play a range of notes - 
                            adjacent boards could be connected to in a host/agent configuration. All protocols and all inputs and outputs (including the DAC) had to be programmed ourselves. 
                            I also implemented an advanced recording/playback feature. <br />
                            <h2>Technical Details</h2>
                            This project was a great opportunity to learn about concurrent programming, as the microcontroller had to be able to handle multiple inputs and outputs at the same time.
                            I used a combination of interrupts and polling to handle the inputs and outputs, and performed worst-case analysis to ensure that the microcontroller could handle the load.
                            The DAC ran on a 22kHz interupt and had an accumulator based-design. The system also supported polyphony, where every pressed key was mapped to an accumulator, and an efficient allocate 
                            and deallocate algorithm was used to manage them. <br />
                            I greatly enjoyed this project as one of my hobbies is playing the piano and I had never had to chance to work on an embedded systems project before - 
                            the skills I gained here also proved invaluable to my personal projects.
                        </div>
                        </>
                    } badges = { ["Concurrent Programming", "C++", "PlatformIO/Arduino", "STM32"] } />
                </>
            } badges = { ["3D Printing", "CAD", "C++", "STM32", "Concurrent Programming", "PlatformIO/Arduino"]
            } />
            {/* Machine Learning */}
            <ProjectDesc title="Machine Learning" content = {
                <>
                    <CarouselCustom className={styles.carouselStyle} imgList={ ["NAImage.jpg", "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1", "sampleVideo.mp4"] }/>
                    <div className="prose">
                        <h2>Description</h2>
                        During my time at Imperial College, I undertook several projects in the field of Machine Learning, including a project on Computer Vision and Neural Networks.
                        We were tasked with implementing a Neural Network from scratch in Python using PyTorch, and trained it on the California Housing Dataset to predict the price of a house based on its location and other features.
                        We also implemented a decision tree algorithm with pruning capabilities on a dataset containing information about the strength of WiFi signals from different rooms in a building.
                        THe objective of the algorithm was to predict the room that the user was in based on the strength of the WiFi signals.
                        
                    </div>
                </>
            } badges = {
                ["PyTorch", "Computer Vision", "ViT Transformers"]
            } />
            {/* Digital Systems */}
            <ProjectDesc title="Digital Systems" content = {
                <div></div>
            } badges = {
                ["FPGA", "Verilog", "Quartus", "C", "NIOS II"]
            } />
            {/* Computer Graphics */}
            <ProjectDesc title="Computer Graphics" content = {
                <div></div>
            } badges = {
                ["OpenGL", "C++", "Raytracing", "Shaders"]
            } />
            {/* Wall-EE */}
            <ProjectDesc title="Wall-EE" content = {
                <div></div>
            } badges = {
                ["Computer Vision", "FPGA", "Verilog", "Quartus", "C", "NIOS II"]
            } />
            {/* C Compiler */}
            <ProjectDesc title="C Compiler" content = {
                <div></div>
            } badges = {
                ["C++", "Compiler Design", "Flex", "Bison"]
            } /> 
            {/* Skribblios */}
            <ProjectDesc title="Skribblios" content = {
                <div></div>
            } badges = {
                ["FPGA", "C", "Quartus"]
            } />
            {/* MIPS CPU */}
            <ProjectDesc title="Dual Core MIPS CPU" content = {
                <div></div>
            } badges = {
                ["Boolean Algebra & Optimisation", "Computer Architecture", "CPU Design"]
            } />
       </>
    );
}


export default Imperial; 