---
title: SkribblNIOS
# Old site wording (legacy Imperial.tsx:121), shortened to fit one line.
summary: A Skribbl.io clone, where the user would draw by tilting the FPGA (making use of the accelerometers) and the app would display the drawing in real time.
description: 'Tilt-to-draw multiplayer game: FPGA with a NIOS II core streams accelerometer-driven strokes to a web app.'
tier: secondary
order: 12
hue: 278
icon: pencil
tags: [fpga, embedded, software]
dates:
  start: '[[CHECK: year]]'
status: complete
context: university
contextDetail: University group project
team:
  size: 6
  role: Team lead; entire FPGA and NIOS II side
tech:
  - Verilog
  - C
  - NIOS II
  - Quartus
  - FPGA accelerometer
links: []
cover:
  type: video
  src: sampleVideo.mp4
  alt: Demonstration of drawing in the game by tilting the FPGA board
  todo: 'The old demo video (legacy/public/Imperial/SkribblNIOS/Video.mp4, 59 MB) re-encoded to 8 MB or less'
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: screenshot of the app with a drawing]]'
    todo: Screenshot of the app with a drawing
---

## Overview

In this project, I took charge of a team of six and were given the broad task of integrating an FPGA running a NIOS II processor with some sort of Internet-connected app. I came up with the idea of creating a Skribbl.io clone, where the user would draw by tilting the FPGA (making use of the accelerometers) and the app would display the drawing in real time. Naturally, the app would support multiplayer functionality, fulfilling the requirements.

## What I did

### My part

I was responsible for the entire FPGA side of the project, including the NIOS II processor, filtering the accelerometers, providing an interface for the app to communicate with the FPGA, as well as all the button and switch inputs and LED outputs. I assigned myself this as I was more familiar with the FPGA from previous coursework.

### The team

[[CHECK: what the other five built: the app, the server, anything else?]]

## Technical detail

The FPGA was programmed in Verilog, and the NIOS II processor was programmed in C. To filter the accelerometers, I used a low-pass filter to remove the noise, and I then translated the tilt of the FPGA into a pair of (X, Y) coordinates using trigonometry.
