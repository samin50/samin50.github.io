---
title: ESP32 Touch Lamps
# CV wording (CV/main.tex:173); the old site has no text for this project.
summary: ESP32 touch lamps that signal each other remotely over MQTT.
description: Pairs of ESP32 touch lamps that signal each other over MQTT.
tier: featured
order: 3
hue: 80
icon: lamp
scene: signal
tags: [embedded]
dates:
  start: '[[CHECK: year]]'
status: complete
context: personal
team:
  size: 1
tech:
  - ESP32
  - 'C/C++ [[CHECK: Arduino or ESP-IDF?]]'
  - MQTT
  - Capacitive touch
  - LEDs
links: []
cover:
  type: image
  src: ../../assets/placeholders/placeholder.svg
  alt: '[[TODO: photo of the two lamps lit]]'
  todo: Photo of both lamps lit, landscape, at least 1600 px wide
gallery:
  - type: video
    src: sampleVideo.mp4
    alt: One lamp being touched and the other lighting up
    todo: Short clip of one lamp triggering the other
---

## Overview

Touch lamps built on ESP32s that signal each other remotely over MQTT: touch one and the other lights up, wherever it is.

## The problem

[[TODO: why you built the lamps, in your own words]]

## What I did

[[TODO: what you designed and built, in your own words]]

## Technical detail

[[CHECK: capacitive touch via ESP32 touch pins or a sensor IC; broker hosted where; LED type; enclosure printed?]]

## Results

[[TODO: how the lamps are used now]]
