---
title: STM32 Synthesiser
# Old site wording (legacy Imperial.tsx:42), first sentence, with "in a team of four" added.
summary: In this project, I worked in a team of four to program an STM32 microcontroller to synthesise music in real time, written in C++ with PlatformIO.
description: 'Real-time synthesiser on an STM32: 22 kHz DAC interrupt, polyphony, linked boards, recording and playback.'
tier: archive
order: 10
hue: 325
icon: music
tags: [embedded]
dates:
  start: '2023-03'
status: complete
context: university
contextDetail: University group project
team:
  size: 4
  role: Polyphony, key scanning, menus, recording and playback, timing analysis
tech:
  - C++
  - STM32 (NUCLEO-L432KC)
  - FreeRTOS
  - PlatformIO
  - STM32duino (Arduino)
  - CAN bus
  - U8g2
  - Python
results:
  - value: '22 kHz'
    label: sample interrupt generating the audio, one phase accumulator per voice
  - value: '8'
    label: voices of polyphony by default, set by one constant
  - value: '55 %'
    label: worst-case CPU utilisation with 8 voices, from the timing-analysis build
  - value: '38'
    label: voices the CPU could handle in the worst case before overloading, from a polyphony sweep
links: []
cover:
  type: video
  src: sampleVideo.mp4
  alt: Demonstration of the synthesiser being played
  todo: 'The demo video (ES-synth2/Demo.mp4, also legacy/public/Imperial/Embedded/Synth/Demo.mp4, 76 MB) re-encoded to 8 MB or less at 720p'
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: photo of the synthesiser board or boards]]'
    todo: Photo of the board(s), ideally two linked over CAN
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: graph of total CPU utilisation against the number of polyphony voices]]'
    todo: Copy ES-synth2/images/timing.png (my polyphony sweep graph) into src/assets/projects/stm32-synthesiser/
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: oscilloscope captures of the four waveforms: sawtooth, pulse, sine and triangle]]'
    todo: 'Combine ES-synth2/images/sawtooth.png, pulse.png, sine.png and triangle.png (PicoScope captures of the DAC output) into one image'
---

## Overview

In this project, I worked in a team of four to program an STM32 microcontroller to synthesise music, written in C++ with PlatformIO. All the music was synthesised in real time. The user could select from four wave types (sawtooth, pulse, sine and triangle) and play a range of notes, and adjacent boards could be connected in a host/agent configuration over a CAN bus. All protocols and all inputs and outputs (including the DAC) had to be programmed ourselves. [[CHECK: the course supplied a starter project and a small CAN driver library (lib/ES_CAN), and the display used the U8g2 library. Do you want to say "programmed ourselves on top of a minimal starter project" instead?]] I also implemented an advanced recording/playback feature.

The firmware runs on FreeRTOS. Five tasks handle the keys, the display, CAN messages and playback, while a hardware-timer interrupt generates every audio sample.

## The problem

This was Embedded Systems coursework. Each keyboard module has 12 keys (one octave), four rotary knobs, a joystick, a small OLED display and a CAN bus port, controlled by a NUCLEO-L432KC (STM32L432, Arm Cortex-M4). The firmware has to scan the inputs, update the display and talk to other modules while still producing an audio sample exactly on time, 22,000 times a second. If the audio interrupt or a high-priority task overruns, the sound glitches or keys are missed, so the work has to be split into tasks that provably fit in the CPU time available.

## What I did

### My part

My commits cover most of the firmware's structure and the features built on it:

- **Task structure and shared-data protection.** I set up the FreeRTOS tasks and mutexes (aba038f). I also fixed an early concurrency bug: key scanning took the mutex once per row while writing straight into the shared key array. I changed it to scan into a local array and copy it in under one lock (20332ef).
- **Key and knob scanning.** I wrote the key-matrix reader and the 12-note step-size table (34a2aa1), and the knob decoding for all four knobs (99185a5). The final scanKeysTask, the quadrature `rotationDirection` decoder and the joystick reading are in my commits.
- **Polyphony.** I wrote the first audio interrupt with one phase accumulator per voice (d1526e1), then 8-voice polyphony (6c07532). I also wrote the allocate and deallocate functions that map key presses to accumulators. I merged the allocation into the key-change and CAN message path, so a host allocates directly and an agent sends the event over CAN instead (aa57fe3).
- **Menus.** I rewrote the display into a multi-page menu: a main screen for volume, octave and wave type, an advanced screen for host/agent and record/playback, and record and playback screens (3576a94).
- **Recording and playback.** I wrote the recording and playback feature (3576a94, then fixes in 0d9c302). Every key press and release is stored with its octave and a timestamp, up to 512 events. Playback replays them through the same allocate and deallocate functions, so recordings keep their polyphony.
- **Pitch bend and volume.** I added the joystick control: Y bends the pitch and X fine-tunes the volume (0d9c302). I then reworked the waveform code into a single `switch` in the interrupt (5b5fc58).
- **Timing analysis.** I added the `TEST_MODE` build that runs each task and the audio interrupt under worst-case conditions and reports execution times (4de2cc5, e11b8aa). I wrote a Python notebook that generates the step-size table and plots CPU utilisation against the polyphony setting (PythonHelpers/helper.ipynb). I also wrote most of the performance section of the report (93ad4c4, 6506016, eb3c624).
- **Integration.** I made the final code clean-up and the code submission (612710b, 416e779, 688d17d).

[[CHECK: attribution caveat. git blame credits most of the final source to me, but some of that comes from my refactor and clean-up commits (aa57fe3, 3576a94, 612710b) reworking code that started in teammates' commits. The key press/release state machine, the CAN tasks, the original waveform code and sine table, and the pressed-note display all began in other people's commits. I have listed those under The team.]]

### The team

The rest of the team built:

- **CAN communication**: the receive and transmit interrupts, the incoming and outgoing message queues, `decodeTask` and `CANSend`. The 3-mailbox counting semaphore was also part of this.
- **Key press/release detection**: the state machine that compares the previous and current key states. I later extended it to allocate accumulators directly.
- **Waveforms**: the pulse, sine (lookup table) and triangle waves, plus an audio fix to the octave shift.
- **Display**: the pressed-notes readout, later extended to show notes with their octaves and during recording.
- **Report**: the task, interrupt, shared-resource and dependency sections, the task dependency diagram and the oscilloscope waveform captures.

## Technical detail

This project was a great opportunity to learn about concurrent programming, as the microcontroller had to be able to handle multiple inputs and outputs at the same time. I used a combination of interrupts and polling to handle the inputs and outputs, and performed worst-case analysis to ensure that the microcontroller could handle the load.

- **Audio generation.** The DAC ran on a 22 kHz interrupt and had an accumulator-based design. Each voice has a 32-bit phase accumulator, which is incremented by a step size chosen so that it overflows at the note's frequency. The top 8 bits give the phase, and these become a sawtooth directly, or a pulse, triangle or sine (from a 256-entry lookup table). Only the 12 step sizes for one octave are stored. Other octaves are a left or right shift of the step size, because each octave doubles the frequency. The outputs of all voices are averaged, then scaled by the volume and joystick before being written to the DAC.
- **Polyphony.** The system also supported polyphony, where every pressed key was mapped to an accumulator, and an efficient allocate and deallocate algorithm was used to manage them. Allocation scans the 8 accumulators for a free one. A reverse map from each of the 84 possible keys (7 octaves) to its accumulator makes release a direct lookup rather than a search, and it stops a key that is already held from taking a second accumulator, which would otherwise leave a stuck note. The number of voices is a single constant, `POLYPHONY`.
- **Tasks and priorities.** Playback (priority 5) and key scanning (4) each run every 50 ms, so playback replays events at the same resolution they were recorded at. CAN decoding (3) and sending (2) block on their queues. The display (1) refreshes every 100 ms. Shared settings are written with atomic stores, the key array is protected by a mutex, and a counting semaphore limits CAN transmission to the STM32's three mailboxes.
- **Host and agent boards.** Any board can be set as host or agent from the menu. An agent doesn't play sound. It encodes each key event as a press or release, its octave and its key number, and sends it over CAN. The host's decode task feeds these events into the same allocate and deallocate functions as its own keys, so notes from every board share one pool of voices.
- **Timing analysis.** A compile-time `TEST_MODE` switch builds the firmware without the scheduler. Each task and the audio interrupt then run 32 times under worst-case conditions (every accumulator in use, every key changing state), and the average time is printed over serial. A second switch, `STAT_ONLY`, prints just the figures, which I used to sweep the polyphony setting and plot the graph. [[CHECK: in the test build the blocking CAN queue and transmit calls are compiled out, so the CAN rows in the table don't include the time actually spent sending.]]

I greatly enjoyed this project as one of my hobbies is playing the piano and I had never had the chance to work on an embedded systems project before. The skills I gained here also proved invaluable to my personal projects.

## Results

The final firmware supports 8-voice polyphony across four sound profiles, octave selection, pitch bend and volume from the joystick, a multi-page menu, host/agent configuration over CAN, and recording and playback of up to 512 key events. All of these features appear in the team's demo video.

With 8 voices, the measured worst-case execution times add up to about 55 % CPU utilisation. The audio interrupt takes about 17 µs of its 45 µs period (37 %), and the display update takes about 18 ms every 100 ms (18 %). Sweeping the polyphony setting showed the system could handle up to 38 voices in the worst case before becoming unstable. The code was submitted on 23 March 2023 and the report on 25 March 2023.

[[CHECK: outcome of the demonstration, and the grade]]
