---
title: MIDI-Reactive LED Controller
# Old site wording (legacy DIYProjects.tsx:14), shortened to fit one line.
summary: For my Casio CDP-S350, I wanted to add some reactive LEDs that would trigger on note presses.
description: WS2812B strip along the piano keys that lights each played note, driven by a Raspberry Pi Zero over MIDI, in a 3D-printed housing.
tier: secondary
order: 14
hue: 355
icon: piano
tags: [embedded, fabrication]
dates:
  start: '[[CHECK: year]]'
status: complete
context: personal
team:
  size: 1
tech:
  - 'Raspberry Pi Zero [[CHECK: Raspberry Pi Zero]]'
  - Python
  - WS2812B
  - MIDI
  - Linux
  - Soldering
  - 3D printing
links: []
cover:
  type: image
  src: ../../assets/placeholders/placeholder.svg
  alt: '[[TODO: photo of the LEDs lit along the piano keys]]'
  todo: Photo of the LEDs lit along the keys, landscape
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: photo of the controller and its 3D-printed housing]]'
    todo: Photo of the controller and housing
  - type: video
    src: sampleVideo.mp4
    alt: The piano being played with the LEDs lighting each note
    todo: 'A piano clip of 60 s or less showing the LEDs (the same clip as the About page)'
---

## Overview

For my Casio CDP-S350, I wanted to add some reactive LEDs that would trigger on note presses as seen through some YouTube videos (though those are typically done in post). To accomplish this, I used a Raspberry Pi Zero [[CHECK: Raspberry Pi Zero]] and a wired MIDI connection to my piano. I attached a strip of WS2812B LEDs along the notes of the piano, and used [this](https://github.com/onlaj/Piano-LED-Visualizer) program to control the LEDs. I added to this by forking the code and adding a few features, such as simultaneous wireless MIDI output to my laptop to enable another visualiser to be used, as can be seen in my piano videos.

## What I did

I built the electronics and 3D-printed housing for the controller.
