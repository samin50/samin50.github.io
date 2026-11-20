---
title: SkribblNIOS
# Old site wording (legacy Imperial.tsx:121), shortened to fit one line.
summary: A Skribbl.io clone where you draw by tilting an FPGA board, using its accelerometer, and every player sees the drawing in real time.
description: 'Tilt-to-draw multiplayer game: FPGA with a NIOS II core streams accelerometer-driven strokes to a web app.'
tier: featured
order: 5
hue: 278
icon: pencil
tags: [fpga, embedded, software]
dates:
  start: '2022-02'
  end: '2022-03'
status: complete
context: university
contextDetail: University group project
team:
  size: 6
  role: 'Team lead; entire FPGA and NIOS II side, plus the game server and integration.'
tech:
  - Verilog
  - C
  - NIOS II
  - Quartus
  - Platform Designer (Qsys)
  - DE10-Lite (MAX 10)
  - FPGA accelerometer
  - JTAG UART
  - Python
  - pygame
  - TCP sockets
results:
  - value: '2,500'
    label: samples in the moving-average filter on each accelerometer axis
  - value: '±35° / ±25°'
    label: roll and pitch range mapped onto the canvas
  - value: '9 %'
    label: of the MAX 10's logic elements used (4,673 of 49,760)
links: []
cover:
  type: image
  src: Startup.png
  alt: Demonstration of the board and the UI
gallery:
  - type: video
    src: skribbldemo.mp4
    poster: ../../assets/projects/skribblnios/Startup.png
    alt: 'Demo video'
    caption: Demo video of the FPGA with the SkribblNios game
---

## Overview

In this project, I took charge of a team of six, and we were given the broad task of integrating an FPGA running a NIOS II processor with some sort of Internet-connected app. I came up with the idea of creating a Skribbl.io clone, where the user would draw by tilting the FPGA (making use of the accelerometers) and the app would display the drawing in real time. Naturally, the app would support multiplayer functionality, fulfilling the requirements; and thus the name "SkibblNios" was born.

The finished system has three parts:

- **The board:** a Terasic DE10-Lite (Intel MAX 10) running a NIOS II soft processor. It reads the accelerometer, buttons and switches, and shows the round timer on the LEDs and your score on the seven-segment displays.
- **The game client:** a Python desktop app built with pygame (lobby, avatar selection, canvas, chat, word choice). It talks to the board over the JTAG UART on the USB cable.
- **The server:** a Python TCP server that tracks the players, picks who draws next, times each round, checks guesses and keeps the scores. It was run on AWS for the demo.

## The problem

The interesting constraint was the input - a mouse gives you exact screen coordinates while a tilting board gives you a noisy three-axis acceleration reading. Turning that into a pen position steady enough to draw with while being fast enough to feel live, and then sending it to every other player, were the main problems of this system.

## What I did

### My part

I was responsible for the entire FPGA side of the project, including the NIOS II processor, filtering the accelerometers, providing an interface for the app to communicate with the FPGA, as well as all the button and switch inputs and LED outputs. I assigned myself this as I was more familiar with the FPGA from previous coursework.

In detail, from my commits:

- **Hardware system.** I built the NIOS II system in Platform Designer: a NIOS II/f ("fast") core, on-chip memory, an SDRAM controller, a JTAG UART, the accelerometer's SPI controller, a timer, a PLL, and PIO blocks for the six seven-segment displays, ten LEDs, two buttons and ten switches. The top-level Verilog connects this system to the board's pins.
- **Firmware (C).** The firmware runs a small state machine driven by single-letter commands from the game: initialise, set the round length, start a round, end the game. During a round it reads the accelerometer, filters it, converts it to tilt angles, and streams those along with the button and switch states back to the PC. It also fills the LEDs as a progress bar over the round and writes the score to the seven-segment displays.
- **PC-side bridge (Python).** A small class wraps the JTAG UART. It parses the board's messages on a background thread and calls into the game: draw at a point, update the colour switches, change the brush size.
- **Server and networking.** I also wrote most of the TCP server and the client communicator. This covered round timing, choosing a drawer (and picking a new one if the drawer leaves), checking guesses (with a "no cheating" check for the drawer), time-based scoring, and the player leaderboard.
- **Integration.** I wired the menu, game, client and FPGA together in the entry point and the game UI.
- **Lead.** I set up the repository and its branch structure (FPGA, client, server and AWS branches) and wrote the initial task list assigning everyone their milestones.

### The team

The other five members worked on:

- **Game UI (pygame):** the main menu and lobby, avatar and character selection, the canvas and brush, the colour palette and eraser, the chat box, word choice and the gradual letter reveal, the round timer, and music.
- **Networking:** the first server and client prototypes, and parts of the server's disconnect handling and command processing.
- **UI concept and research:** a UI concept sketch, and early help with communication research. They also wrote a stand-in that pretended to be the FPGA, sending random coordinates, so the game could be tested without the board.

## Technical detail

The FPGA was programmed in Verilog, and the NIOS II processor was programmed in C. To filter the accelerometers, I used a low-pass filter to remove the noise, and I then translated the tilt of the FPGA into a pair of (X, Y) coordinates using trigonometry.

**Data flow.** Board → JTAG UART → Python bridge → game client → TCP server → every other client. The board sends plain-text lines: `C <roll> <pitch>` for the pen, `B <buttons>` and `S <switches>`. The game sends commands back: `I` to initialise, `S <round length>`, `R <rank> <score>` at the start of each round, and `E` to end the game. Between clients and the server, commands are text prefixed `SERVERCMD:` or `CLIENTCMD:` (`!DRW x y`, `!BROADCAST`, `!DRAWERSELECT`, `!STARTROUND`, …). The server forwards the drawer's points to everyone else.

**Filtering went through three versions.** I started with a de-mean filter, which subtracts the mean of the last 8 samples. Next came a weighted FIR ("n-tap") filter with a coefficient table, recomputing the full convolution for every sample. Eventually, I replaced it with a moving average that keeps a running total: it adds the newest sample and subtracts the oldest, so each sample costs the same however long the window is to avoid expensive computer. I then tuned the window from 500 to 5,000 and settled on 2,500 samples for a good balance between responsiveness and stability.

**Tilt to coordinates.** The filtered readings are turned into roll and pitch angles with `atan(y / √(x² + z²))` and `atan(x / √(y² + z²))`. The game clamps these to ±35° of roll and ±25° of pitch, scales them linearly onto the canvas, and draws a line from the previous point, so fast movements still give a continuous stroke.

**Memory.** My design notes record that the default 64 KB of on-chip memory filled up, and that doubling it wasn't enough either. The final system adds the board's SDRAM.

**Licensing.** The design uses the NIOS II/f core without a full licence, so Quartus produced a time-limited programming file.

## Results

The game was played end to end with the board as the pen: a lobby with avatars, a random drawer each round, word choice, live strokes on every client, chat-based guessing, scores and a leaderboard. On the board itself, the LEDs counted down the round and the seven-segment displays showed your rank and score. 

The hardware is small: 4,673 of the MAX 10's 49,760 logic elements (9 %) and 29 % of its memory bits.
