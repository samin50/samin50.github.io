---
title: Autonomous Mars Rover
# Old site wording, unchanged (legacy Imperial.tsx:142).
summary: In this project, I worked in a team of six to create a rover that could identify different coloured balls and autonomously avoid them.
description: 'FPGA vision pipeline in Verilog: HSV thresholding for uneven lighting, per-target distance estimation and noise rejection.'
tier: featured
order: 4
hue: 50
icon: cpu
tags: [fpga, computer-vision, embedded]
dates:
  start: '[[CHECK: year]]'
status: complete
context: University group project
team:
  size: 6
  role: FPGA and vision pipeline
tech:
  - Verilog
  - C
  - FPGA
  - Quartus
  - NIOS II
  - UART
  - Arduino
links: []
cover:
  type: image
  src: ../../assets/placeholders/placeholder.svg
  alt: '[[TODO: photo of the rover, at least 1600 px wide]]'
  todo: A better photo of the rover, landscape, at least 1600 px wide
gallery:
  # From the old site (legacy/public/Imperial/WallEE/image018.jpg). It is only 370 x 278.
  - type: image
    src: ../../assets/projects/autonomous-mars-rover/rover.jpg
    alt: Greyscale camera frame with a red ball picked out in solid red; part of a red shoe beside it is picked out too
    caption: 'Output of the vision pipeline. [[TODO: a larger frame if one exists; this one is 370 px wide]]'
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: block diagram of the Verilog vision pipeline]]'
    todo: Block diagram of the pipeline (can be drawn from a verified description)
---

## Overview

In this project, I worked in a team of six to create a rover that could identify different coloured balls and autonomously avoid them. This was done using a camera connected to an FPGA, which communicated with the main Arduino board via UART.

## The problem

Detect coloured targets reliably from a moving rover under uneven lighting, estimate how far away each one is, and ignore stray pixel clusters, all in hardware on the FPGA so the result reaches the drive controller quickly.

## What I did

### My part

As I had previous experience with the FPGA, I again assigned myself responsible for the entire FPGA side of the project, devising a Computer Vision algorithm written in Verilog to identify the balls. This novel algorithm had the ability to perform noise rejection, and could identify the balls even when other objects in the scene were of similar colour.

I wrote the rover's FPGA vision pipeline in Verilog and C: HSV conversion to find obstacles in uneven lighting, per-target distance estimation, and noise rejection to ignore stray pixel clusters.

### The team

[[CHECK: what the other five built: chassis and drive, Arduino control, power, anything else?]]

## Technical detail

- RGB-to-HSV conversion in the pixel pipeline, so thresholds are set on hue and saturation, which are far less sensitive to brightness changes than RGB thresholds.
- Distance estimation per target. [[CHECK: from apparent size, or vertical position in frame?]]
- Noise rejection. [[CHECK: minimum blob size / morphological filtering / temporal filtering?]]
- Results sent to the Arduino over UART.

## Results

[[CHECK: outcome of the project demonstration, grade]]
