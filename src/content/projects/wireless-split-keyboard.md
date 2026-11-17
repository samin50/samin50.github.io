---
title: Wireless Split Keyboard
summary: Battery-powered split keyboard across two custom PCB generations around a bare nRF52833, with about 10k lines of Zephyr firmware.
description: 'Two generations of custom nRF52833 PCBs and ~10k lines of Zephyr firmware: BLE between halves, USB/BLE HID, Li-ion power path, MCUboot.'
tier: featured
order: 1
hue: 25
icon: keyboard
scene: pcb
tags: [pcb, embedded, fabrication, software]
dates:
  start: '[[CHECK: year]]'
status: complete
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
    label: PCB generations, 4-layer then a 2-layer redesign
  - value: '~10k'
    label: lines of C firmware on Zephyr RTOS
  - value: '7.5 ms'
    label: BLE connection interval between the halves
  - value: '96 %'
    label: efficient buck-boost 3.3 V rail
links: []
cover:
  type: image
  src: ../../assets/placeholders/placeholder.svg
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

A battery-powered wireless split keyboard that I designed, hand-soldered and brought up across two PCB generations: a 4-layer first version, then a 2-layer redesign for manufacturability and cost. Each half is built around a bare nRF52833 QFN with a chip antenna, fabricated at JLCPCB, running about 10k lines of C firmware on Zephyr RTOS that I wrote with a custom board definition.

## The problem

Off-the-shelf split keyboards fix the layout and the firmware; I wanted a layout, case and keycaps of my own, wireless operation on a battery with proper charging and fuel gauging, and a codebase I understood down to the radio. That meant doing the board, the power system, the firmware and the tooling myself. [[CHECK: is this the actual motivation?]]

## What I did

- Designed the schematics and layouts in KiCad for both generations and hand-soldered and brought up each board.
- Designed the power system: Li-ion power-path charging, a coulomb-counting fuel gauge, a 96 %-efficient buck-boost 3.3 V rail, a 5 V boost rail for LEDs, and USB-C with ESD protection.
- Redesigned for manufacturability and cost: reduced 4 layers to 2, swapped parts for hand-solderability and stock availability, scripted a via-size audit to avoid fab surcharges, panelised with KiKit and added test points.
- Wrote the firmware on Zephyr RTOS with a custom board definition: a custom BLE GATT protocol between the halves at a 7.5 ms interval, BLE and USB HID with three host profiles, interrupt-driven matrix scanning over I2C, power-state management and an MCUboot bootloader.
- Debugged with a J-Link and per-peripheral bring-up firmware; built Python tools that generate the keymap code and the resin-printed keycaps (OpenSCAD) from a single layout file.
- Modelled the chassis in FreeCAD and Blender and resin (MSLA) printed the keycaps and chassis.

## Technical detail

- **Radio and MCU:** a bare nRF52833 with a chip antenna rather than a module, so antenna matching and layout were part of the design. [[CHECK: anything to say about antenna matching / RF layout?]]
- **Power:** power-path charging lets the keyboard run from USB while charging; the fuel gauge reports remaining charge over BLE [[CHECK: is battery level reported to the host?]]; the buck-boost keeps 3.3 V across the full Li-ion range.
- **Firmware structure:** a Zephyr board definition and devicetree for the custom hardware; the halves talk over a custom GATT service; the central half presents as a BLE HID device or a USB HID device with three switchable host profiles; matrix scanning is interrupt-driven via an I2C expander [[CHECK: is the matrix behind an I2C GPIO expander?]]; sleep states manage power when idle.
- **Manufacturing:** a scripted audit of via sizes against JLCPCB's surcharge thresholds, KiKit panelisation, and test points for bring-up.
- **Tooling:** one layout file generates both the firmware keymap and the OpenSCAD keycap geometry.

## Results

Two working generations; the second is cheaper, 2-layer and hand-solderable with in-stock parts. [[CHECK: is the keyboard in daily use? Battery life figure?]]
