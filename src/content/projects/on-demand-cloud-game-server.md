---
title: On-Demand Cloud Game Server
summary: AWS-hosted game server that starts on demand and shuts itself down when idle, controlled by a Python watchdog in Docker.
tier: featured
order: 5
hue: 255
icon: cloud
tags: [cloud, software]
dates:
  start: '[[CHECK: year]]'
status: complete
context: Personal project
team:
  size: 1
tech:
  - Python
  - AWS
  - Docker
links: []
cover:
  type: image
  src: ../../assets/placeholders/placeholder.svg
  alt: '[[TODO: architecture diagram: trigger, instance start, container boot, watchdog, shutdown]]'
  todo: Confirm the architecture so a diagram can be drawn, or supply one
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: screenshot of the start interface or the watchdog log]]'
    todo: Screenshot of the start interface or watchdog log
---

## Overview

An AWS-hosted [[CHECK: game name]] server that starts on demand and shuts itself down when nobody is playing. A Python watchdog I wrote, running in Docker, tracks active players and drives the lifecycle.

<!-- Stub: the full body is in docs/content-plan.md §5.2.4 and is added in Phase 4. -->
