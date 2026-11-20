---
title: Wireless Split Keyboard
summary: Battery-powered split keyboard built around a bare nRF52833, with custom Zephyr C firmware. Resin printed chassis and keycaps. Hand-soldered.
description: 'Custom nRF52833 PCBs running C Zephyr firmware: BLE between halves, USB/BLE HID, Li-ion power path, MCUboot.'
tier: featured
order: 1
hue: 25
icon: keyboard
scene: pcb
tags: [pcb, embedded, fabrication, software]
dates:
  start: '2025'
status: in-progress
context: personal
team:
  size: 1
tech:
  - KiCad
  - KiKit
  - nRF52833
  - Zephyr RTOS
  - C
  - BLE
  - USB HID
  - MCUboot
  - FreeCAD
  - Blender
  - OpenSCAD
  - Python
  - J-Link
  - JLCPCB
results:
  - value: '2'
    label: layer stackup, optimised for cost and assembly
  - value: '7.5 ms'
    label: BLE connection interval between the halves
  - value: '96 %'
    label: efficient buck-boost 3.3 V rail
links: []
cover:
  type: image
  src: PCBKeyboard.png
  alt: '[[TODO: photo of the finished split keyboard, both halves, top-down or three-quarter view]]'
  todo: Photo of the finished keyboard, both halves, landscape, at least 1600 px wide
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: photo of the bare generation-1 4-layer PCB]]'
    caption: Generation 1, 4-layer.
    todo: Bare generation-1 PCB, top side
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: photo of the bare generation-2 2-layer PCB]]'
    caption: Generation 2, redesigned to 2 layers.
    todo: Bare generation-2 PCB, top side
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: close-up of the assembled PCB showing the nRF52833 and chip antenna]]'
    todo: Assembled PCB close-up around the MCU and antenna
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: KiCad 3D render of the board, front and back]]'
    todo: KiCad 3D render, front and back
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: schematic of the power section: charger, fuel gauge, buck-boost]]'
    caption: Power section.
    todo: Schematic export of the power sheet, PNG or SVG
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: KiCad layout screenshot]]'
    todo: Layout screenshot
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: bench photo of bring-up with the J-Link attached]]'
    todo: Bring-up bench photo with J-Link
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: OpenSCAD keycap render or photo of the resin-printed keycaps]]'
    todo: Keycap render or photo
  - type: video
    src: sampleVideo.mp4
    alt: The keyboard pairing and being typed on
    todo: '15–30 s pairing and typing clip'
---

## Overview

A battery-powered wireless split keyboard that I designed, hand-soldered and programmed after multiple iterations: first, a 4-layer version, then a 2-layer redesign once my newly developed skills gave me enough confidence to do so (and for cost!). Each half is built around a bare nRF52833 QFN with a chip antenna, running C firmware on Zephyr RTOS that I wrote with a custom board definition.

## The motivation

This project started because I had the desire to learn PCB design and I believed it was the final skill I needed in the product-creation skill set, but was never offered this module at University. I wanted a challenge and the chance to really express my passion and pride in engineering and building things - I wanted to make something I could really make mine. Hence, the idea to make my own keyboard was born. 

## What I did

My work was definitely cut out for me; not only did I need to learn PCB design software, I also had to select components, design the power and battery stages, learn to route and also learn RF. 

For this project, I:
- Designed the schematics and layouts in KiCad.
- Designed the power system: Li-ion power-path charging, a coulomb-counting fuel gauge, a 96 %-efficient buck-boost 3.3 V rail, a 5 V boost rail for LEDs, and USB-C with ESD protection.
- Originally had a 4 layer board, but decided I should be able to make it a 2 layer board with my skills now having improved. My routing skills also improved during this redesign, so it was redesigned again once more to include more features, and to make it easier to assemble by hand.
- Optimised my costs by scripting a via-size audit to avoid fabrication surcharges, panelised with KiKit and added test points for debugging.
- Wrote the firmware on Zephyr RTOS with a custom board definition: a custom BLE GATT protocol between the halves at a 7.5 ms interval, BLE and USB HID with three host profiles, interrupt-driven matrix scanning over I2C, power-state management and an MCUboot bootloader.
- Debugged with a J-Link and modularised each software component for easier development; built Python tools that generate the keymap code and the resin-printed keycaps (OpenSCAD) from a single layout file.
- Modelled the chassis in FreeCAD and Blender and resin (MSLA) printed the keycaps and chassis.

## Technical detail

- **Radio and MCU:** a bare nRF52833 with a chip antenna rather than a module, so antenna matching and layout were part of the design. Impedance control was needed here to ensure the performance of the antenna, and proper routing and component selection was needed to for the nRF52833 to perform within spec.
- **Power:** power-path charging lets the keyboard run from USB while charging; the fuel gauge reports charging to the MCU via i2c; the buck-boost keeps 3.3 V across the full Li-ion range.
- **Firmware structure:** a Zephyr board definition and devicetree for the custom hardware; the halves talk over a custom GATT service; the central half presents as a BLE HID device or a USB HID device with three switchable host profiles; matrix scanning is interrupt-driven via an I2C expander; sleep states manage power when idle.

## Results - TBC

A completely custom 2-layer board that is hand-solderable with in-stock parts; the chassis/case is still a WIP, but the bulk of the work is now complete. The firmware also needs some touchups once I begin using it, but it is a useable keyboard in its current state.