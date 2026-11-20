---
title: Machine Vision Component Sorter
summary: Conveyor-based sorter that detects, classifies and bins electronic components with on-device YOLOv8 on a Raspberry Pi 4B.
description: 'MEng final-year project: a conveyor sorter that classifies electronic components on a Raspberry Pi with YOLOv8-OBB at 99.5 % mAP50.'
tier: featured
order: 1
hue: 150
icon: scan
tags: [computer-vision, ai, embedded, fabrication]
dates:
  start: '2023-11'
  end: '2024-06'
status: complete
context: university
contextDetail: MEng final-year project, awarded a First
team:
  size: 1
tech:
  - Python
  - PyTorch
  - YOLOv8 (OBB)
  - Ultralytics
  - OpenCV
  - ONNX Runtime
  - DeepSparse
  - Pygame / pygame_gui
  - Python multiprocessing
  - Raspberry Pi 4B
  - TMC2209 / NEMA17
  - FreeCAD
  - Fritzing
  - cProfile / SnakeViz
results:
  - value: '99.5 %'
    label: mAP50 on a custom 1,076-image dataset
  - value: '82.8 %'
    label: mAP50-95 for the same model
  - value: '2.8×'
    label: faster inference after ONNX export and runtime benchmarking
  - value: '0.62 s'
    label: per frame on the Pi, down from 1.76 s
links: []
cover:
  type: image
  src: FYP.png
  alt: '[[TODO: photo of the complete sorter: conveyor, camera mount and bins, three-quarter view]]'
  todo: Photo of the complete sorter, three-quarter view, landscape, at least 1600 px wide
gallery:
  # - type: video
  #   src: sampleVideo.mp4
  #   alt: 'Sorter running: components detected on the belt and dropped into bins'
  #   caption: The sorter running end to end.
  #   todo: '20–40 s clip of the sorter running, 1080p, no audio needed'
  - type: image
    src: Predictions.jpg
    alt: Oriented bounding boxes drawn around resistors, capacitors and LEDs
    caption: Oriented bounding boxes from the YOLOv8-OBB model.
  - type: image
    src: tmc2209-0.jpeg
    alt: Custom circuit board for stepper control
    caption: A custom circuit board for stepper control
  - type: image
    src: fullsweeper.jpg
    alt: The design of the sweeper arm used to move components into bins
    caption: The design of the sweeper arm used to move components into bins
  - type: image
    src: banddetect.jpg
    alt: 'Resistor band detection'
    caption: Resistor band colour detection used to calculate its resistance
  - type: image
    src: finalmodelmap95.svg
    alt: 'Model evaluation pretrained vs from scratch'
    caption: Performance (mAP50-95) of pretrained model (blue) vs from scratch (orange) over epochs
  - type: image
    src: screeninference.jpg
    alt: 'The UI running on the screen'
    caption: The UI displayed on the screen for an operator to use.
  - type: image
    src: profiler.jpg
    alt: 'Snakeviz profiler'
    caption: SnakeViz profiler used to optimise the system.
---

## Overview

My MEng final-year project (awarded a First): a conveyor-based mechatronic sorter that detects, classifies and bins electronic components (resistors, capacitors, LEDs and more) using on-device computer vision on a Raspberry Pi 4B.

A component placed on the belt breaks an IR beam, the conveyor stops, the camera above the belt captures a frame, and a YOLOv8 oriented-bounding-box model classifies the part. A belt-driven sweeper arm then moves into position and the moving belt pushes the part off into the right bin. Everything runs in Python on the Pi, with a 7" touchscreen UI for monitoring and control.

## The problem

Loose electronic components are slow to sort by hand and look alike at a glance. The goal was a machine that could do it unattended on cheap hardware, which meant a vision model accurate enough to trust and fast enough to run on a Pi without a GPU. This would be particularly useful for those working in the Level 1 labs on the Imperial South Kensington campus, where the components are currently sorted by hand by the lab technicians.

The project brief had three motivations: cut electronic waste and clutter in the Level 1 labs, save the technicians time, and support the labs' work towards LEAF (Laboratory Efficiency Assessment Framework) certification.

## What I did

- Designed and built the conveyor, camera mount and binning mechanism, operated using NEMA17 steppers: a 2020-aluminium-extrusion frame with FDM-printed parts in FreeCAD, bearing-mounted rollers, a belt tensioner, an LED-lit camera housing, a GT2-belt-driven sweeper arm with an endstop, removable bins, and enclosures for the PSU and touchscreen.
- Designed the electronics: a 24 V PSU stepped down to 12 V (motors) and 5 V (Pi, LEDs) with XL4015 buck converters, two TMC2209 stepper-driver boards built on prototyping board, a WS2812B LED ring around the camera and an IR break-beam sensor.
- Wrote a custom dataset collection and annotation tool, then collected and labelled a custom dataset of 1,076 images and fine-tuned a YOLOv8 oriented-bounding-box model in PyTorch with transfer learning, reaching 99.5 % mAP50.
- Exported the model to ONNX and benchmarked edge runtimes (ONNX Runtime, DeepSparse), cutting inference latency 2.8× from 1.76 s to 0.62 s per frame.
- Architected modular, multiprocess Python software, unit-tested each subsystem and profiled it with cProfile.
- As an extension, trained a second YOLOv8 model to detect resistor colour bands for reading resistor values.

## Technical detail

**Vision model**

I used oriented bounding boxes rather than axis-aligned ones (OBB VS AABB), because components arrive at arbitrary angles on the belt. The chosen model to run on the Pi was YOLOv8n-OBB, pretrained on DOTAv1. The dataset covers seven classes (resistor, electrolytic capacitor, ceramic capacitor, film capacitor, inductor, LED, wire) plus 100 background images, split 70/20/10 into train, validation and test sets. Some data augmentation was used to increase the size of the training set.

I trained for up to 50 epochs with early stopping (patience 5), a cosine learning-rate schedule, and the classification loss weighted up (1.2) relative to box loss, because getting the class right mattered more than a perfect box. Training stopped at epoch 26 and the best weights came from epoch 21.

I discovered that transfer learning made a clear difference. A model trained from scratch had only reached 82.5 % mAP50 at the point where the pretrained model first hit 99.5 %, and it needed 40 epochs to reach 98 %.

**Dataset tool**

Regular dataset labelling tools didn't fit the setup, so I wrote my own in true engineering fashion. The software I wrote on the Pi has a training mode that draws a coloured border around the camera feed - with my laptop, I remoted into the Pi and built another tool that finds the window, screenshots it, and uses OpenCV contour detection on that border to crop out the camera frame. Then, I draw the oriented box by hand and save it straight into YOLO format. This became my dataset.

For resistors, the tool stores the colour bands and the calculated value in the filename. A second mode then lets me click on each band to generate labels for the band-detection model.

**Software architecture**

The pipeline is split into python multi-processes so the belt and actuators are not blocked by inference. The UI runs in the main process at 30 Hz. Inference runs in its own process and gets frames through single-slot `multiprocessing` queues and events, which is a producer/consumer pattern that stops a slow inference from freezing the UI.

The break-beam and endstop are handled with GPIO interrupts, and each beam break starts a separate process that stops the belt, requests a classification and queues the sweeper move to ensure maximum responsiveness at all times. The final sorting code moves the sweeper on a thread.

- I used `multiprocessing` rather than `threading` because Python's GIL would have serialised the CPU-bound inference with the UI.
- A `simulate.py` stub stands in for `RPi.GPIO`, the LED driver and YOLO, so the same code runs on a Windows laptop for development and on the Pi for deployment.
- The UI can also stream frames over sockets to my laptop with a GPU for faster inference during development.
- The Pi runs a minimal X session with no desktop environment, which leaves more resources for inference. That was one reason for choosing Pygame for the UI.
- Profiling the main process with cProfile and SnakeViz showed 86 % of its time spent idle in the frame-rate limiter (`Clock.tick`) and 1.32 % in fetching frames from the vision process, so the UI was not being held up.

**Runtime benchmarking**

- Benchmarked ONNX Runtime and DeepSparse on the Pi 4B to pick the runtime. Ultralytics PyTorch inference took 1,762 ms per image; ONNX Runtime averaged 1,036 ms; DeepSparse averaged 619 ms (415 ms median).
- I had planned to sparsify the model with SparseML before deploying it to DeepSparse. However, the YOLOv8-OBB model was only released in January 2024 and SparseML's YOLO integration didn't support it. Rewriting the training loop to expose the optimiser wasn't feasible in the time, so the dense ONNX model went to DeepSparse instead.

**Problems along the way**

- **Glare:** the first design had the components on an acrylic plate with the camera facing up through it, and the LED ring reflected off the plate. I dropped it for a conveyor with a downward-facing camera.
- **Sorting mechanism:** the first sweeper design had a gate at each bin, opened by linkages as the arm passed. I replaced it with a single angled arm on a carriage that uses the belt's own motion to push parts off.
- **LED flicker:** the WS2812B strip flickered and ignored commands. I moved it from PWM to SPI, which removed the need for root privileges but not the flicker. A PicoScope trace showed the 5 V rail sagging to 4.68 V, because of voltage drop in thin wiring, which was also under-volting the Pi. Thicker wires fixed it.
- **False positives:** the first model had no background images, so it always predicted something, and both test-set false positives were wires. Adding 100 background images (the belt with assorted non-component objects) fixed it.
- **Orientation:** I had assumed the OBB vertex order would encode which way round a resistor faces, which you need to read its bands in order. It doesn't, so I added a "stem" class to the band model to mark the resistor's lead end.

## Results

- **Component detection:** 99.5 % mAP50 and 82.8 % mAP50-95, with no misclassifications in the test-set or the combined validation-and-test confusion matrices.
- **Inference:** down from 1.76 s to 0.62 s per frame (2.8×) by moving from Ultralytics PyTorch to DeepSparse on the Pi. 
- **Resistor values:** the band-detection model reached 83.7 % mAP50 on its validation set, but it struggled with rare colours such as blue and grey because the resistors were too small in frame (the smallest took up 0.74 % of the image). It wasn't accurate enough to deploy, and the fix would have been to move the camera closer and recollect the data.
- **The system:** a working end-to-end sorter, and a First-class grade. 
- **Limitations:** components are placed on the belt by hand (there is no feeder), the system sorts one component at a time, and value identification is not in the deployed system.
