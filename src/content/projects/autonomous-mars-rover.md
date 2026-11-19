---
title: Autonomous Mars Rover
summary: In this project, I worked in a team of six to create a rover that could identify different coloured balls and autonomously avoid them.
description: 'FPGA vision pipeline in Verilog: HSV thresholding, camera auto gain, shift-register noise filtering, and per-target width and angle sent over SPI.'
tier: featured
order: 4
hue: 50
icon: cpu
tags: [fpga, computer-vision, embedded]
dates:
  start: '2022-05'
  end: '2022-06'
status: complete
context: university
contextDetail: University group project
team:
  size: 6
  role: FPGA and vision pipeline
tech:
  - Verilog
  - C
  - FPGA
  - Quartus
  - NIOS II
  - SPI
  - ESP32
  - Arduino
  - Python
  - OpenCV
results:
  - value: '7'
    label: target types detected in hardware, six ball colours plus a striped "building"
  - value: '34 %'
    label: of the MAX 10's logic elements in the final build, down from 98 % with a median filter
  - value: '8'
    label: measured points behind the pixel-width-to-distance fit (7 to 71 cm)
  - value: '16-bit'
    label: packet per target (ID, width, angle), sent to the ESP32 as two SPI bytes
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
    alt: '[[TODO: cropped camera frame of the red ball and red jumper with the two vertical bound lines, from Vision/Report.docx]]'
    todo: Crop the camera area out of the noise-rejection screenshot in Vision/Report.docx (word/media/image7.jpeg, 1376 x 774)
    caption: The red jumper also matches the red thresholds, but the bound lines stay on the ball because it has the longest run of red pixels.
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: block diagram of the Verilog vision pipeline]]'
    todo: 'Block diagram of the pipeline: camera, Bayer to RGB, RGB to HSV, per-colour thresholds, shift-register filter, longest-run bounds, SPI to ESP32, with the average-brightness path to the NIOS II for auto gain'
---

## Overview

In this project, I worked in a team of six to create a rover (WALL-EE) that could identify different coloured balls and autonomously avoid them. This was done using a camera connected to an FPGA, which sent what it detected to the rover's ESP32 control board over SPI.

The rover was split into six subsystems: Command, Control, Drive, Energy, Radar and Vision. I was responsible for Vision. It runs on a DE10-Lite (Intel MAX 10) board with a Terasic D8M camera. The aim is to spot the obstacles, six colours of ball ("aliens") and a black-and-white striped "building", and report how far away and in which direction each one is, so the rest of the rover can avoid them and show them on its web interface.

## The problem

We needed to detect coloured targets reliably from a moving rover under uneven lighting, estimate how far away each one is, and ignore stray pixel clusters. All of this runs in hardware on the FPGA, so the result reaches the drive controller quickly.

The FPGA also limits how this can be done. Pixels arrive one at a time in a stream, and the whole design has to fit in the MAX 10's roughly 50,000 logic elements. That rules out the usual software approach of buffering a frame and filtering it.

## What I did

### My part

As I had previous experience with FPGAs, I made myself responsible for the entire FPGA side of the project. I devised a computer vision algorithm, written in Verilog, to identify the balls. My own algorithm could reject noise, and it could pick out the balls even when other objects in the scene were a similar colour.

I wrote the rover's FPGA vision pipeline in Verilog and C. The parts were:

- **HSV conversion** in the pixel stream, so obstacles can be found under uneven lighting.
- **Auto gain**: C on the NIOS II soft processor adjusts the camera's gain from the average frame brightness, which the hardware measures.
- **Per-colour detection and noise rejection**: a shift-register filter, then a "longest run" rule for finding each target's bounds, so stray pixel clusters are ignored.
- **Building detection**: picking out the black-and-white striped target.
- **SPI link to the ESP32**: each target's identity, pixel width and angle in a 16-bit packet. I also wrote the ESP32 test code that requests the packets, decodes them and turns pixel width into distance in centimetres.
- **Python tuning tools** (OpenCV and Tkinter), so I could try HSV thresholds on saved camera frames without recompiling the Verilog each time.

I also set up the team's shared repository, with a folder and report file for each subsystem, and added the course resources to it.

The starting point was the DE10-Lite camera project. The camera, I2C and auto-focus IP came from Terasic and OpenCores, and the Platform Designer (Qsys) system was generated by the tools. The image-processing block began as a template that drew a box around anything strongly red. Everything described below replaced that logic.

### The team

The other subsystems were built by the rest of the team:

- **Command**: a React web front end and a Node.js/Express back end, linked to the rover over MQTT. It stores and displays the aliens, buildings and "fans" the rover finds.
- **Control**: ESP32 firmware that connects to Command over Wi-Fi and MQTT, and reads the rover's position from an ADNS-3080 optical-flow sensor.
- **Drive**: motor control and the optical-flow position sensing. [[CHECK: the repo has only a report file for Drive; the motor-driver and optical-flow sample code is course material]]
- **Energy**: solar charging (MPPT buck and boost converter code) and battery management, including a "homecoming" routine.
- **Radar**: Arduino code that sweeps and counts pulses to find the "fans". [[CHECK: what the radar detected]]

## Technical detail

- **RGB-to-HSV conversion in the pixel pipeline.** Thresholds are set on hue and saturation, which are far less sensitive to brightness changes than RGB thresholds, and I can use integer maths.
- **Auto gain.** Too much gain causes bright spots, and too little leaves the targets too dark to pass their thresholds. The image processor adds up the value (V) of every fourth pixel and passes the total to the NIOS II every six frames. The NIOS II then steps the camera gain up or down until the average sits in a target band (105 to 115 out of 255). In effect it is a simple negative-feedback controller, and it means the thresholds do not need retuning for each room.
- **Noise rejection, second attempt.** My first approach quantised H, S and V into bands, so that each ball would fall into its own band. In practice random noisy pixels landed in the balls' bands too, which made the image noisier, not cleaner. Next I tried a 3×3 median filter before the quantisation. That needs three rows of 640 HSV pixels held on chip, plus a sort for every pixel. Even after optimising it, the build used 48,993 of 49,760 logic elements (98 %) and failed to fit, so I dropped it.
- **Noise rejection, final design: a shift-register "mode filter".** Each of the six colours has a 32-bit shift register along the row, and each matching pixel shifts in a 1. A pixel counts as part of a ball only if more than 12 of the last 32 pixels matched that colour. No sorting or line buffers are needed, and the thresholds can be looser. The finished design uses 16,676 logic elements (34 %).
- **Bounds by longest run.** For each colour, the hardware tracks runs of detected pixels along each row and keeps the widest run in the frame as that ball's left and right bounds. A few stray matching pixels can't beat the real ball. That is how the red ball wins over a red jumper in the same frame. Bounds are averaged with the previous frame's values to stop them jumping around. A target is only reported if it is more than 60 px wide.
- **Building detection.** This uses luminance rather than hue. When there are enough black (below 60) and enough white (above 140) pixels in the same 32-pixel window, the camera is looking at stripes. The hardware counts the alternations, and it reports a building if the striped region is more than 60 px wide with more than six alternations.
- **Distance from apparent size.** Rather than model the camera optics, I measured eight ball distances against their pixel widths (324 px at 7 cm down to 38 px at 71 cm) and fitted an exponential curve: distance ≈ 68.23 × 0.9923^width cm. The FPGA only sends the width, and the ESP32 evaluates the curve, because that needs floating point arithmetic.
- **Angle** is the midpoint of the bounds divided by 20, which gives a 5-bit value from 0 to 31 across the frame. The filter's lag shifts the bounds sideways by a fixed amount. This doesn't change the width, so distance isn't affected, and the angle is coarse enough that the shift doesn't matter.
- **SPI to the ESP32.** The Intel 3-Wire SPI core didn't work for this, so following a third-party guide, I used the SPI-slave-to-Avalon-ST core instead. That core only carries 8 bits at a time, so each 16-bit packet (a 3-bit target ID, 8 bits of width and a 5-bit angle) is split into two bytes. The ESP32 is the SPI master at 128 kHz. It asks for each target in turn with a command byte, and an all-zero reply means "not seen".

## Results

By the end, the vision subsystem detected all six ball colours and the striped building. It rejected same-coloured clutter, held the camera's brightness steady with auto gain, and delivered each target's ID, width and angle to the ESP32 over SPI.