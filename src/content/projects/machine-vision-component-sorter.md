---
title: Machine Vision Component Sorter
summary: Conveyor-based sorter that detects, classifies and bins electronic components with on-device YOLOv8 on a Raspberry Pi 4.
description: 'MEng final-year project: a conveyor sorter that classifies electronic components on a Raspberry Pi with YOLOv8-OBB at 99.5 % mAP50.'
tier: featured
order: 2
hue: 150
icon: scan
tags: [computer-vision, ai, embedded, fabrication]
dates:
  start: '[[CHECK: start date]]'
  end: '2024'
status: complete
context: MEng final-year project, awarded a First
team:
  size: 1
tech:
  - Python
  - PyTorch
  - YOLOv8 (OBB)
  - OpenCV
  - ONNX Runtime
  - DeepSparse
  - Raspberry Pi 4
  - cProfile
results:
  - value: '99.5 %'
    label: mAP50 on a custom 1,076-image dataset
  - value: '2.8×'
    label: faster inference after ONNX export and runtime benchmarking
  - value: '0.62 s'
    label: per frame on the Pi, down from 1.76 s
links: []
cover:
  type: image
  src: ../../assets/placeholders/placeholder.svg
  alt: '[[TODO: photo of the complete sorter: conveyor, camera mount and bins, three-quarter view]]'
  todo: Photo of the complete sorter, three-quarter view, landscape, at least 1600 px wide
gallery:
  - type: video
    src: sampleVideo.mp4
    alt: 'Sorter running: components detected on the belt and dropped into bins'
    caption: The sorter running end to end.
    todo: '20–40 s clip of the sorter running, 1080p, no audio needed'
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: camera frame with oriented bounding boxes drawn around resistors, capacitors and LEDs]]'
    caption: Oriented bounding boxes from the YOLOv8-OBB model.
    todo: Annotated inference frame with OBB boxes and class labels
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: training curve or confusion matrix for the YOLOv8 model]]'
    todo: Training curve or confusion matrix
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: diagram of the multiprocess software architecture]]'
    todo: Software architecture diagram
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: CAD view of the conveyor and camera mount]]'
    todo: CAD view of the conveyor
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: close-up of the sorting bins]]'
    todo: Close-up of the bins
---

## Overview

My MEng final-year project (awarded a First): a conveyor-based mechatronic sorter that detects, classifies and bins electronic components (resistors, capacitors, LEDs and more) using on-device computer vision on a Raspberry Pi 4.

## The problem

Loose electronic components are slow to sort by hand and look alike at a glance. The goal was a machine that could do it unattended on cheap hardware, which meant a vision model accurate enough to trust and fast enough to run on a Pi without a GPU. [[CHECK: matches the project's framing?]]

## What I did

- Designed and built the conveyor, camera mount and binning mechanism. [[CHECK: what actuates the binning: servo flaps, air, pusher?]]
- Collected and labelled a custom dataset of 1,076 images and fine-tuned a YOLOv8 oriented-bounding-box model in PyTorch with transfer learning, reaching 99.5 % mAP50.
- Exported the model to ONNX and benchmarked edge runtimes (ONNX Runtime, DeepSparse), cutting inference latency 2.8× from 1.76 s to 0.62 s per frame.
- Architected modular, multiprocess Python software, unit-tested each subsystem and profiled it with cProfile.

## Technical detail

- Oriented bounding boxes rather than axis-aligned ones, because components arrive at arbitrary angles on the belt. [[CHECK: does orientation feed the binning/pick step?]]
- Transfer learning from pretrained YOLOv8 weights on the 1,076-image set. [[CHECK: augmentation strategy, train/val split]]
- The pipeline is split into processes so the belt and actuators are not blocked by inference. [[CHECK: the actual process split]]
- Benchmarked ONNX Runtime and DeepSparse on the Pi 4 to pick the runtime.

## Results

99.5 % mAP50, inference down from 1.76 s to 0.62 s per frame (2.8×), a working end-to-end sorter, and a First-class grade.
