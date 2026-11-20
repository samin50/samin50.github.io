---
title: ESP32 Touch Lamps
# CV wording (CV/main.tex:173); the old site has no text for this project.
summary: A pair of ESP32-C6 touch lamps that signal each other remotely over MQTT, with always-on FreeRTOS firmware.
description: A pair of ESP32 touch lamps that signal each other over MQTT.
tier: featured
order: 3
hue: 80
icon: lamp
scene: signal
tags: [embedded, fabrication, software]
dates:
  start: '2026-02'
  end: '2026-10'
status: complete
context: personal
team:
  size: 1
tech:
  - ESP32-C6 (Seeed XIAO)
  - 'C++'
  - Arduino framework
  - FreeRTOS
  - MQTT (PubSubClient)
  - PlatformIO
  - FreeCAD
  - Python
  - HTML/JS
results:
  - value: '~370 ms'
    label: MQTT publish on an open connection
  - value: '~150 ms'
    label: for the other lamp's acknowledgement to come back
  - value: '15'
    label: animation and ambient settings tunable from the lamp's own web page
links: []
cover:
  type: image
  src: Lamps.png
  alt: '[[TODO: photo of the two lamps lit]]'
  todo: Photo of both lamps lit, landscape, at least 1600 px wide
---

## Overview

Touch lamps built on ESP32s that signal each other remotely over MQTT: interact with one and the other lights up, wherever it is.

Each lamp is a Seeed XIAO ESP32-C6 driving a 1 W warm-white LED through a constant-current driver, with a TTP223 capacitive touch sensor, an ambient light sensor and a mode switch. The two lamps talk through a hosted MQTT broker over TLS. A message from the other lamp plays a slow breathe through dark; when your own message lands, the other lamp acknowledges it and yours swells once, letting you know if your message was received.

## The motivation

These were made as a special birthday gift, and this was an idea that would be both practical and unique. The aim was a calm, ambient object rather than a gadget.

## What I did

All the electronics, the enclosures and the firmware - I bought some cheap lamps so I could harvest the diffusers and batteries. I ended up not using the batteries due to (understandable) safety concerns.

- **Hardware:** Chose and wired the parts: XIAO ESP32-C6, TTP223 touch module, TEMT6000 ambient light sensor, a 1 W warm-white LED (~3200 K) on an aluminium star PCB, and an LDO6AJSA linear constant-current driver fed from the 5 V USB rail.
- **Enclosures:** Designed the housings in FreeCAD based on the diffusers I bought; a rabbit-shaped lamp and a box lamp, split into base, housing, cover, lid, light mount, an ESP32-C6 mount and a USB inlet. I printed them in a brown PLA.
- **Firmware:** Written for permanent USB power: always on, two FreeRTOS tasks, a separate physical switch for sending, persistent brightness, reconnect backoff and an acknowledgement protocol. I built it up in stages, each built, flashed and checked on hardware before starting the next.
- **Settings mode:** Holding the touch pad for 3 s turns the lamp into a WiFi access point with a captive portal. Its web page lets you pick and test a WiFi network, change the animation and ambient tunables, choose whether faults are shown with the switch open, and upload firmware over the air (OTA).
- **Tooling:** A Python serial monitor that writes timestamped logs, a Jupyter notebook that publishes test touches and acks straight to the broker (so the receive path could be tested without the second lamp), a notebook that resizes images for the settings page, and a notebook that turns the FSM diagram into Markdown tables.

## Technical detail

**Hardware.** Touch comes from a TTP223 capacitive sensor module on a digital input, brightness is 12-bit PWM into the LDO6AJSA, which limits LED current in hardware (~200 to 250 mA), so the firmware only ever dims. On 5 V the linear driver dissipates about 0.43 W at 250 mA.

**Broker and protocol.** Both lamps connect over TLS to a HiveMQ Cloud MQTT broker. Topics are `lamp/<pair>/<lamp>/touch` and `.../ack`. Touches are published retained, so a touch sent while the other lamp is offline is delivered when it next subscribes; the receiver then clears it so it is not replayed. Acks are deliberately not retained. MQTT 3.1.1 has no message expiry, so a retained ack could fire hours later and claim the other person was there when they weren't. An ack is only animated if it arrives within 15 s of the send it answers.

**Always-on design.** The lamp never sleeps, which shaped the firmware: the lamp must respond to touch at all times, except when it is visibly busy. Network calls can block for seconds with no light output, so WiFi, TLS and MQTT run in their own FreeRTOS task, and only the UI task touches the LED; the two communicate through event and command queues. On the single-core C6 a blocking socket only blocks its own task, so the lamp stays responsive to touch during a failed connection.

**Light behaviour.** Each animation means one thing. A send shimmers while it is in flight; success just settles, and failure blinks hard-edged square pulses (3 for WiFi, 5 for the MQTT broker) so they can't be mistaken for a fade. Only an incoming touch event can go fully dark to 0%, allow you to tell touch events and acks apart. The ambient sensor sorts the room into three bands (dark, lit, daylight) measured on the hardware, and samples only when the LED is known to be off so it doesn't measure itself. Banding, rather than a continuous curve, keeps two lamps in comparably lit rooms at the same level.

## Results

A very happy gift recipient and a fully functioning desk lamp.

Measured on the hardware, a send takes about 3 s (WiFi ~1.8 s plus TLS ~1 s); with the connection already open, a publish takes about 370 ms, and the other lamp's ack comes back within about 150 ms.

