---
title: Machine Vision Component Sorter
summary: Conveyor-based sorter that detects, classifies and bins electronic components with on-device YOLOv8 on a Raspberry Pi 4.
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

<!-- Stub: the full body is in docs/content-plan.md §5.2.2 and is added in Phase 4. -->
