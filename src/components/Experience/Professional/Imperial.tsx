import React from "react";
import styles from "../../../style";
import { Collapsible } from '../../Reusables/Collapsible';
import { ProjectDesc } from "../../Reusables/ProjectDesc";
import { CarouselCustom } from "../../Reusables/CarouselCustom";

function Imperial() {
    return (
       <div>
            {/* Embedded Systems */}
            <ProjectDesc title="Embedded Systems" content = {
                <>
                    <div className="h-72">
                        <CarouselCustom imgList={ ["NAImage.jpg"] }/>
                    </div>
                    <div>
                    </div>
                </>
            } badges = { ["3D Printing", "CAD", "C++", "STM32", "Concurrent Programming"]
            } />
            {/* Machine Learning */}
            <ProjectDesc title="Machine Learning" content = {
                <div></div>
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
       </div>
    );
}


export default Imperial; 