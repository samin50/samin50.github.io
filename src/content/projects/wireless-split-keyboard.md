---
title: Wireless Split Keyboard
summary: Battery-powered split keyboard across two custom PCB generations around a bare nRF52833, with about 10k lines of Zephyr firmware.
tier: featured
order: 1
hue: 25
icon: keyboard
scene: pcb
tags: [pcb, embedded, fabrication, software]
dates:
  start: '[[CHECK: year]]'
status: complete
context: Personal project
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

<!-- Stub: the full body (problem, what I did, technical detail, results) is in docs/content-plan.md §5.2.1 and is added in Phase 4. -->
