---
title: On-Demand Cloud Game Server
summary: AWS-hosted game server that starts on demand and shuts itself down when idle, controlled by a Python watchdog in Docker.
description: An AWS game server that starts on demand and shuts itself down when idle, driven by a Python watchdog in Docker.
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

## The problem

A game server for friends is used a few hours a week, but a VM bills by the hour whether or not anyone is connected. Keeping it on is wasteful; turning it on by hand means someone has to be the admin. The server should appear when wanted and disappear when idle. [[CHECK: motivation]]

## What I did

- Containerised the game server and the watchdog with Docker.
- Wrote the watchdog in Python: it tracks active players [[CHECK: how players are counted: server query protocol, logs, RCON?]], and after [[CHECK: idle threshold]] with no players it stops the instance.
- Start on demand. [[CHECK: how a player triggers a start: Discord bot, web page, DNS trick?]]

## Technical detail

[[CHECK: AWS services used (EC2? spot? EBS for world data?), how state persists across stop/start, IAM scope of the watchdog, cost before/after]]

## Results

[[CHECK: idle cost and typical monthly cost; uptime behaviour]]
