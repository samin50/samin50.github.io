import React from "react";
import styles from "../../../style";
import { Collapsible } from '../../Collapsible';
import { ProjectDesc } from "../../ProjectDesc";

function Imperial() {
    return (
       <div>
            <ProjectDesc title="Machine Learning" content = {
                <div>Hi</div>
            } badges = {
                ["PyTorch", "Computer Vision", "ViT Transformers"]
            } />
            <ProjectDesc title="Digital Systems" content = {
                <div>Hi</div>
            } badges = {
                ["FPGA", "Verilog", "Quartus", "C", "NIOS II"]
            } />
            <ProjectDesc title="Computer Graphics" content = {
                <div>Hi</div>
            } badges = {
                ["OpenGL", "C++", "Raytracing", "Shaders"]
            } />
            <ProjectDesc title="Wall-EE" content = {
                <div>Hi</div>
            } badges = {
                ["Computer Vision", "FPGA", "Verilog", "Quartus", "C", "NIOS II"]
            } />
            <ProjectDesc title="C Compiler" content = {
                <div>Hi</div>
            } badges = {
                ["C++", "Compiler Design", "Flex", "Bison"]
            } /> 
            <ProjectDesc title="Skribblios" content = {
                <div>Hi</div>
            } badges = {
                ["FPGA", "C", "Quartus"]
            } />
            <ProjectDesc title="Dual Core MIPS CPU" content = {
                <div>Hi</div>
            } badges = {
                ["Verilog", "Computer Architecture", "CPU Design"]
            } />
       </div>
    );
}


export default Imperial; 