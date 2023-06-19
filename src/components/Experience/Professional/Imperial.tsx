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
                        <CarouselCustom className={styles.carouselStyle} imgList={ ["NAImage.jpg"] }/>
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
                        <CarouselCustom className={styles.carouselStyle} imgList={ ["Imperial/Embedded/Synth/Demo.mp4", "NAImage.jpg"] }/>
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
                    <CarouselCustom className={styles.carouselStyle} imgList={ ["NAImage.jpg"] }/>
                    <div className="prose">
                        <h2>Description</h2>
                        During my time at Imperial College, I undertook several projects in the field of Machine Learning, including a project on Computer Vision and Neural Networks.
                        We were tasked with implementing a Neural Network from scratch in Python using PyTorch, and trained it on the California Housing Dataset to predict the price of a house based on its location and other features.
                        We also implemented a decision tree algorithm with pruning capabilities on a dataset containing information about the strength of WiFi signals from different rooms in a building.
                        THe objective of the algorithm was to predict the room that the user was in based on the strength of the WiFi signals. Finally, we modified a ViT model to determine whether a user
                        had Parkinsons given an image of a spiral that they drew.

                    </div>
                </>
            } badges = {
                ["PyTorch", "Computer Vision", "ViT Transformers"]
            } />
            {/* Digital Systems */}
            <ProjectDesc title="Digital Systems" content = {
                <div>
                    <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
                    <div className="prose">
                        <h2>Description</h2>
                        As part as of a team of two, we used Verilog to optimise performance for a specific function using Intel's IP cores and Quartus Prime.
                    </div>
                </div>
            } badges = {
                ["FPGA", "Verilog", "Quartus", "C", "NIOS II"]
            } />
            {/* Computer Graphics */}
            <ProjectDesc title="Computer Graphics" content = {
                <div>
                    <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
                    <div className="prose">
                        <h2>Description</h2>
                        In this project, I learnt about rasterisation and raytracing, and implemented both in C++ using OpenGL.
                        I implemented the phong shading model, and made use of a normal map with a texture to create a teapot with a brick-liek surface.
                        I also implemented a raytracer that could render spheres and planes, and later enhanced it to support soft shadoows and added a starry sky to the background.
                    </div>
                </div>
            } badges = {
                ["OpenGL", "C++", "Raytracing", "Shaders"]
            } />
            {/* C Compiler */}
            <ProjectDesc title="C Compiler" content = {
                <div>
                    <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
                    <div className="prose">
                        <h2>Description</h2>
                        In this project, I implemented a C compiler in C++ using Flex and Bison. The compiler supported a subset of C, including functions, structs, arrays, pointers, and basic arithmetic.
                        The compiler compiled C code into MIPS assembly, which could then be run on a MIPS simulator.
                    </div>
                </div>
            } badges = {
                ["C++", "Compiler Design", "Flex", "Bison"]
            } /> 
            {/* Skribblios */}
            <ProjectDesc title="SkribblNIOS" content = {
                <div>
                    <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
                    <div className="prose">
                        <h2>Description</h2>
                        In this project, I took charge of a team of six and were given the broad task of integrating an FPGA running a NIOS II processor 
                        with some sort of Internet-connected app. I came up with the idea of creating a Skribbl.io clone, where the user would draw 
                        by tilting the FPGA (making use of the accelerometers) and the app would display the drawing in real time. Naturally, the app would
                        would support multiplayer functionality, fulfilling the requirements.
                        <h2>My Role</h2>
                        I was responsible for the entire FPGA side of the project, including the NIOS II processor, filtering the accelerometers,
                        providing an interface for the app to communicate with the FPGA, as well as all the button and switch inputs and LED outputs.
                        I assigned myself this as I was more familiar with the FPGA from previous coursework.
                        <h2>Technical Details</h2>
                        The FPGA was programmed in Verilog, and the NIOS II processor was programmed in C.
                        To filter the accelerometers, I used a low-pass filter to remove the noise, and I then translated the tilt of the FPGA into a
                        a pair of (X, Y) coordinates using trigonometry.
                    </div>
                </div>
            } badges = {
                ["FPGA", "C", "Quartus"]
            } />
            {/* Wall-EE */}
            <ProjectDesc title="Wall-EE" content = {
                <div>
                    <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
                    <div className="prose">
                        <h2>Description</h2>
                        In this project, I worked in a team of six to create a rover that could identify different coloured balls and autonomously avoid them.
                        This was done using a camera connected to an FPGA, which communicated with the main Arduino board via UART.
                        <h2>My Role</h2>
                        As I had previous experience with the FPGA, I again assigned myself responsible for the entire FPGA side of the project, 
                        divising a Computer Vision algorithm written in Verilog to identify the balls.
                    </div>
                </div>
            } badges = {
                ["Computer Vision", "FPGA", "Verilog", "Quartus", "C", "NIOS II"]
            } />
            {/* MIPS CPU */}
            <ProjectDesc title="Dual Core MIPS CPU" content = {
                <div>
                    <CarouselCustom className={styles.carouselStyle} imgList={["NAImage.jpg"]}/>
                    <div className="prose">
                        <h2>Description</h2>
                        In this project, I worked in a team of three to create a dual-core MIPS CPU in a schematic-based design software with floating point arithmetic support
                        and UART port.
                        <h2>My Role</h2>
                        I was responsible for upgrading the base single-core CPU to a dual-core CPU, coming up with my own design and then writing a Fibonacci program in MIPS assembly to test the performance increase.
                    </div>
                </div>
            } badges = {
                ["Boolean Algebra & Optimisation", "Computer Architecture", "CPU Design"]
            } />
       </>
    );
}


export default Imperial; 