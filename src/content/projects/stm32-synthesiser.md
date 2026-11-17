---
title: STM32 Synthesiser
# Old site wording (legacy Imperial.tsx:42), first sentence.
summary: In this project, I programmed an STM32 microcontroller to synthesise music in PlatformIO written in C++.
description: 'Real-time synthesiser on an STM32: 22 kHz DAC interrupt, polyphony, linked boards, recording and playback.'
tier: secondary
order: 10
hue: 325
icon: music
tags: [embedded]
dates:
  start: '[[CHECK: year]]'
status: complete
context: university
team:
  size: '[[CHECK: team size]]'
  role: '[[CHECK: your part of the synthesiser]]'
tech:
  - C++
  - STM32
  - PlatformIO
  - '[[CHECK: RTOS used, if any]]'
links: []
cover:
  type: video
  src: sampleVideo.mp4
  alt: Demonstration of the synthesiser being played
  todo: 'The old demo video (legacy/public/Imperial/Embedded/Synth/Demo.mp4, 76 MB) re-encoded to 8 MB or less at 720p'
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: photo of the synthesiser board or boards]]'
    todo: Photo of the board(s)
---

## Overview

In this project, I programmed an STM32 microcontroller to synthesise music in PlatformIO written in C++. All the music was synthesised in real time, and the user could select from a variety of wave types and play a range of notes - adjacent boards could be connected to in a host/agent configuration. All protocols and all inputs and outputs (including the DAC) had to be programmed ourselves. I also implemented an advanced recording/playback feature.

## What I did

### My part

[[CHECK: which parts were yours; the old text names the recording/playback feature]]

### The team

[[CHECK: what the rest of the team built]]

## Technical detail

This project was a great opportunity to learn about concurrent programming, as the microcontroller had to be able to handle multiple inputs and outputs at the same time. I used a combination of interrupts and polling to handle the inputs and outputs, and performed worst-case analysis to ensure that the microcontroller could handle the load. The DAC ran on a 22kHz interrupt and had an accumulator based-design. The system also supported polyphony, where every pressed key was mapped to an accumulator, and an efficient allocate and deallocate algorithm was used to manage them.

I greatly enjoyed this project as one of my hobbies is playing the piano and I had never had the chance to work on an embedded systems project before - the skills I gained here also proved invaluable to my personal projects.
