---
title: On-Demand Cloud Game Server
summary: Serverless Minecraft server on AWS that starts when a player connects and shuts itself down when idle, with a Python watchdog and a Crafty Controller web UI.
description: A serverless AWS Minecraft server that starts on connect and stops when idle, using Lambda, ECS Fargate, EFS and a Python watchdog in Docker.
tier: featured
order: 7
hue: 255
icon: cloud
tags: [cloud, software]
dates:
  start: '2024'
status: complete
context: personal
team:
  size: 1
tech:
  - AWS
  - Lambda
  - ECS Fargate
  - Route 53
  - EFS
  - CloudWatch
  - IAM
  - Docker
  - Python
  - Crafty Controller
results:
  - value: '0'
    label: tasks running, and billing, while nobody is playing
  - value: '1'
    label: DNS lookup is all it takes to wake the server
links: []
cover:
  type: image
  src: ../../assets/placeholders/placeholder.svg
  alt: '[[TODO: architecture diagram: Route 53 query, Lambda, ECS Fargate task (Crafty + watchdog), EFS, shutdown]]'
  todo: Architecture diagram of the start/stop lifecycle, landscape, at least 1600 px wide
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: screenshot of the Crafty Controller dashboard managing the Minecraft server]]'
    todo: Crafty Controller dashboard screenshot
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: CloudWatch log showing the watchdog detecting idle and stopping the task]]'
    todo: CloudWatch or watchdog log screenshot of an idle shutdown
---

## Overview

A Minecraft server on AWS that only runs when someone wants to play. Connecting to the server's domain triggers a Lambda that starts an ECS Fargate task; a Python watchdog I wrote, running in Docker alongside the server, shuts the task down again once nobody has been online for a while. World data lives on EFS, so nothing is lost between runs, and the server is managed through a Crafty Controller web UI rather than over SSH.

## The problem

Typical Minecraft servers require someone to turn it on, or the host machine to be playing - with a Minecraft server on demand, this problem disappears. ECS Fargate allows us to scale up the hardware depending on our requirements, enabling a more cost-effective solution.

## What I did

- Set up the on-demand start: a Route 53 DNS query for the server's domain triggers a Lambda, which scales the ECS service from 0 to 1. 
- Defined the ECS Fargate task with two containers: Crafty Controller, which runs and manages the Minecraft server and its backups, and the watchdog.
- Wrote the watchdog in Python and packaged it as a Docker image in ECR: it checks for active players via the Crafty API and, after a configurable idle period, sets the service back to 0.
- Moved all persistent state (worlds, configs, logs, backups) onto encrypted EFS volumes so the containers themselves stay disposable.
- Scoped IAM roles for the task (EFS, ECS, notifications) and for execution (image pulls, CloudWatch logs), and sent container output to CloudWatch for debugging.

## Technical detail

- **Lifecycle:** player looks up the domain → Lambda sets the desired count to 1 → Fargate pulls the images and mounts EFS → Crafty boots the Minecraft server → the watchdog stops the task after the idle timeout, with all data retained.
- **Compute:** Fargate rather than EC2, so there is no instance to patch or keep running; the task uses `awsvpc` networking with a security group open only on the game port (25565) and the Crafty UI port (8443).
- **Storage:** separate EFS access points for servers, config, logs, backups and imports, mounted into the Crafty container.
- **Notifications:** start and stop alerts through SNS.

## Results

While idle the server has no compute cost (only EFS storage and DNS), and it comes up on its own when a player tries to join, with no one needing to act as admin.
