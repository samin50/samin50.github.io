---
title: Automated Pet Feeder
# Old site wording (legacy Imperial.tsx:18), shortened: the CAD package named in brackets is left out here.
summary: In this project, I designed and built an automated pet feeder using a 3D printer and CAD software.
description: Web-scheduled pet feeder with a load-cell dispenser on a Raspberry Pi; mechanical design, CAD and 3D printing.
tier: secondary
order: 11
hue: 120
icon: box
tags: [embedded, fabrication, computer-vision, software]
dates:
  start: '[[CHECK: year]]'
status: complete
context: university
contextDetail: University group project
team:
  size: 4
  role: Mechanical design, CAD and 3D printing; project manager
tech:
  - Raspberry Pi
  - Python
  - Vue.js
  - MQTT (Mosquitto)
  - Servo motor
  - FDM and MSLA printing
links: []
# The pictures are from the old site (legacy/public/Imperial/Embedded/PetFeeder/).
# They are 480 x 339, so they are shown small.
cover:
  type: image
  src: ../../assets/projects/automated-pet-feeder/feeder-02.jpg
  alt: CAD render of the pet feeder, a white box with a black lid and base and a slot at the front
  caption: 'The feeder, modelled in SketchUp. [[TODO: higher-resolution originals if available]]'
gallery:
  - type: video
    src: sampleVideo.mp4
    alt: The feeder dispensing food
    todo: 'The old feeder video (legacy/public/Imperial/Embedded/PetFeeder/FeederVid.mp4) re-encoded'
  - type: image
    src: ../../assets/projects/automated-pet-feeder/feeder-03.jpg
    alt: CAD model of the feeder seen from above, looking down into the hopper
  - type: image
    src: ../../assets/projects/automated-pet-feeder/feeder-04.jpg
    alt: CAD model of the feeder with the outer shell removed, showing the hopper and the motor mount at the base
  - type: image
    src: ../../assets/projects/automated-pet-feeder/feeder-05.jpg
    alt: CAD model of the feeder's inner frame from the other side
  - type: image
    src: ../../assets/projects/automated-pet-feeder/feeder-06.jpg
    alt: CAD model of the base tray with the plate that carries the load cell
  - type: image
    src: ../../assets/projects/automated-pet-feeder/feeder-07.jpg
    alt: CAD model of the base with the motor in its mount
  - type: image
    src: ../../assets/projects/automated-pet-feeder/feeder-08.jpg
    alt: CAD model of the base with the dispensing platform tilted
  - type: image
    src: ../../assets/projects/automated-pet-feeder/feeder-09.jpg
    alt: CAD model of the dispensing mechanism on its shaft, inside the frame
  - type: image
    src: ../../assets/projects/automated-pet-feeder/feeder-10.jpg
    alt: CAD model of the assembled feeder without its outer shell
---

## Overview

In this project, I designed and built an automated pet feeder using a 3D printer and CAD software (SketchUp, I later use FreeCAD and Blender for hobby projects). The feeder is controlled by a web app, which allows the user to schedule feeding times and portion sizes. The project was built using a Raspberry Pi, a servo motor, a load cell, and a 3D printer. The backend for the web app was written with FastAPI in Python and the Frontend was written with VueJS. The backend stores data in JSON format and sends it to the MQTT broker (Mosquitto) which is subscribed to by the Raspberry Pi, allowing it to check the feeding schedule.

## What I did

### My part

As I was the only team member with CAD and 3D Printing experience (from my hobbies), I was solely responsible for the aesthetic and mechanical design of the feeder. I also took on the role of project manager, and was responsible for the planning and organisation of the project. The main difficulty I faced was incorporating the load cell into the dispensing mechanism - I had to account for the relatively weak servo motor and had to ensure the accuracy of the load cell as the quantities of food dispensed were only a few grams at most. [[CHECK: "servo motor" is used throughout; the old text said "stepper motor" once, in the description]]

I came up with a design that securely mounted the load cell to plate beneath the dispensing platform, which rotated with the servo motor to dispense food. The dispensing platform could be decoupled from the servo motor, to ensure that the load cell can obtain an accurate reading. For fun, I also decided to implement a Computer Vision model and integrate it into the front-mounted camera to identify whether the pet to be fed was a dog or cat so the feeder would know if the correct pet had come to feed.

I greatly enjoyed this project as I was able to apply and improve my hobbyist CAD and 3D printing skills to a real-world problem.

### The team

[[CHECK: who built the web app, the backend and the Raspberry Pi software]]
