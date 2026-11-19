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
  size: 5
  role: 'Team lead; entire FPGA and NIOS II side, plus the game server and integration [[CHECK: confirm the server and integration work is yours]]'
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
  type: video
  src: sampleVideo.mp4
  alt: Demonstration of drawing in the game by tilting the FPGA board
  todo: 'The old demo video (legacy/public/Imperial/SkribblNIOS/Video.mp4, 59 MB) re-encoded to 8 MB or less'
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: screenshot of the app with a drawing]]'
    todo: Screenshot of the app with a drawing
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: sequence diagram of the game–FPGA protocol: pre-game, round start, drawing, not drawing, game end]]'
    caption: How the game and the FPGA talk to each other over the JTAG UART.
    todo: 'Export Resources/FPGA-Game-Interface.pdf from the skribblnios repo as a PNG (it is a hand-drawn diagram on a dark background)'
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: photo of the DE10-Lite board mid-game, showing the LED round timer and the score on the seven-segment displays]]'
    todo: Photo of the board during a round, if you have one
---

## Overview

In this project, I took charge of a team of six, and we were given the broad task of integrating an FPGA running a NIOS II processor with some sort of Internet-connected app. I came up with the idea of creating a Skribbl.io clone, where the user would draw by tilting the FPGA (making use of the accelerometers) and the app would display the drawing in real time. Naturally, the app would support multiplayer functionality, fulfilling the requirements.

The finished system has three parts:

- **The board:** a Terasic DE10-Lite (Intel MAX 10) running a NIOS II soft processor. It reads the accelerometer, buttons and switches, and shows the round timer on the LEDs and your score on the seven-segment displays.
- **The game client:** a Python desktop app built with pygame (lobby, avatar selection, canvas, chat, word choice). It talks to the board over the JTAG UART on the USB cable.
- **The server:** a Python TCP server that tracks the players, picks who draws next, times each round, checks guesses and keeps the scores. It was run on AWS for the demo. [[CHECK: the "Fix server for aws" commit and a hard-coded cloud IP suggest this; confirm it was the setup on the day]]

## The problem

[[TODO: why Skribbl.io? Anything about the module or brief worth saying (module name, the "FPGA + Internet-connected app" requirement)?]]

The interesting constraint was the input. A mouse gives you exact screen coordinates; a tilting board gives you a noisy three-axis acceleration reading. Turning that into a pen position steady enough to draw with, fast enough to feel live, and sending it to every other player, was most of the work.

## What I did

### My part

[[CHECK: the repo credits most of this work to the commit author "Shaheen" (a Gmail address), not "samin50". "samin50" only made 5 commits: the initial commit, a PDF upload and three file deletions. I've treated "Shaheen" as you, because it owns the samin50 GitHub repo and the commits match your description. Confirm.]]

I was responsible for the entire FPGA side of the project, including the NIOS II processor, filtering the accelerometers, providing an interface for the app to communicate with the FPGA, as well as all the button and switch inputs and LED outputs. I assigned myself this as I was more familiar with the FPGA from previous coursework.

In detail, from my commits:

- **Hardware system.** I built the NIOS II system in Platform Designer: a NIOS II/f ("fast") core, on-chip memory, an SDRAM controller, a JTAG UART, the accelerometer's SPI controller, a timer, a PLL, and PIO blocks for the six seven-segment displays, ten LEDs, two buttons and ten switches. The top-level Verilog connects this system to the board's pins.
- **Firmware (C).** The firmware runs a small state machine driven by single-letter commands from the game: initialise, set the round length, start a round, end the game. During a round it reads the accelerometer, filters it, converts it to tilt angles, and streams those along with the button and switch states back to the PC. It also fills the LEDs as a progress bar over the round and writes the score to the seven-segment displays.
- **PC-side bridge (Python).** A small class wraps the JTAG UART. It parses the board's messages on a background thread and calls into the game: draw at a point, update the colour switches, change the brush size.
- **Server and networking.** I also wrote most of the TCP server and the client communicator. This covered round timing, choosing a drawer (and picking a new one if the drawer leaves), checking guesses (with a "no cheating" check for the drawer), time-based scoring, and the player leaderboard.
- **Integration.** I wired the menu, game, client and FPGA together in the entry point and the game UI. Commit messages through mid-March show this: "Fully integrated server into game", "Finally fixed the game", "allow other players see each other".
- **Lead.** I set up the repository and its branch structure (FPGA, client, server and AWS branches) and wrote the initial task list assigning everyone their milestones.

### The team

The other five members worked on:

- **Game UI (pygame):** the main menu and lobby, avatar and character selection, the canvas and brush, the colour palette and eraser, the chat box, word choice and the gradual letter reveal, the round timer, and music.
- **Networking:** the first server and client prototypes, and parts of the server's disconnect handling and command processing.
- **UI concept and research:** a UI concept sketch, and early help with communication research. They also wrote a stand-in that pretended to be the FPGA, sending random coordinates, so the game could be tested without the board.

## Technical detail

The FPGA was programmed in Verilog, and the NIOS II processor was programmed in C. To filter the accelerometers, I used a low-pass filter to remove the noise, and I then translated the tilt of the FPGA into a pair of (X, Y) coordinates using trigonometry.

**Data flow.** Board → JTAG UART → Python bridge → game client → TCP server → every other client. The board sends plain-text lines: `C <roll> <pitch>` for the pen, `B <buttons>` and `S <switches>`. The game sends commands back: `I` to initialise, `S <round length>`, `R <rank> <score>` at the start of each round, and `E` to end the game. Between clients and the server, commands are text prefixed `SERVERCMD:` or `CLIENTCMD:` (`!DRW x y`, `!BROADCAST`, `!DRAWERSELECT`, `!STARTROUND`, …). The server forwards the drawer's points to everyone else.

**Filtering went through three versions.** I started with a de-mean filter, which subtracts the mean of the last 8 samples. Next came a weighted FIR ("n-tap") filter with a coefficient table, recomputing the full convolution for every sample. In the "Optimise filter" commit I replaced it with a moving average that keeps a running total: it adds the newest sample and subtracts the oldest, so each sample costs the same however long the window is. I then tuned the window from 500 to 5,000 and settled on 2,500 samples. [[CHECK: why 2,500? Smoothness against lag, or memory? Each window is three 2,500-entry 32-bit buffers, about 30 kB]]

**Tilt to coordinates.** The filtered readings are turned into roll and pitch angles with `atan(y / √(x² + z²))` and `atan(x / √(y² + z²))`. The game clamps these to ±35° of roll and ±25° of pitch, scales them linearly onto the canvas, and draws a line from the previous point, so fast movements still give a continuous stroke.

**Memory.** My design notes record that the default 64 KB of on-chip memory filled up, and that doubling it wasn't enough either. The final system adds the board's SDRAM. [[CHECK: was the filter buffers' size the reason for the SDRAM?]]

**Licensing.** The design uses the NIOS II/f core without a full licence, so Quartus produced a time-limited programming file. [[CHECK: the output file is named `skribblnios_time_limited.sof`; did the board have to stay connected to Quartus during play?]]

[[TODO: optional short code excerpt, e.g. the running-sum moving average from skribblmain.c]]

## Results

[[TODO: how the demo went, the mark or grade, and any feedback]]

The game was played end to end with the board as the pen: a lobby with avatars, a random drawer each round, word choice, live strokes on every client, chat-based guessing, scores and a leaderboard. On the board itself, the LEDs counted down the round and the seven-segment displays showed your rank and score. [[CHECK: confirm this all worked in the final demo; the last fix commit, "Completely fixed :)", came a week after the bulk of the work]]

The hardware is small: 4,673 of the MAX 10's 49,760 logic elements (9 %) and 29 % of its memory bits.

[[TODO: what would you do differently? Possible points: messages weren't framed on the wire (the code works around messages arriving merged or partial with short sleeps and try/except), and server, IP and port settings were hard-coded]]
