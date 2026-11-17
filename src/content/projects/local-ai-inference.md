---
title: Local AI Inference
summary: Self-hosted open-weight LLMs and image and video generation on local hardware, with Ollama and Open WebUI in Docker and ComfyUI pipelines.
description: Self-hosted open-weight LLMs and image/video generation with Ollama, Open WebUI and ComfyUI in Docker.
tier: featured
order: 7
hue: 195
icon: sparkles
tags: [ai, software]
dates:
  start: '[[CHECK: year started]]'
status: ongoing
context: Personal project
team:
  size: 1
tech:
  - Ollama
  - Open WebUI
  - ComfyUI
  - Docker
  - Linux
links: []
cover:
  type: image
  src: ../../assets/placeholders/placeholder.svg
  alt: '[[TODO: screenshot of a ComfyUI graph, at least 1600 px wide]]'
  todo: ComfyUI graph screenshot, at least 1600 px wide
gallery:
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: screenshot of Open WebUI running a local model]]'
    todo: Open WebUI screenshot
  - type: image
    src: ../../assets/placeholders/placeholder.svg
    alt: '[[TODO: one generated image you are happy to publish, with the pipeline named]]'
    todo: One generated image, with the pipeline named in the caption
---

## Overview

I self-host open-weight LLMs and image and video generation models on local hardware, running Ollama and Open WebUI in Docker and building ComfyUI pipelines.

## The problem

Hosted APIs are convenient but opaque and metered; running models locally shows what open-weight models can actually do, what they cost in VRAM and latency, and keeps experiments private.

## What I did

- Ollama serving models and Open WebUI as the front end, both in Docker. [[CHECK: Docker Compose?]]
- ComfyUI pipelines for image and video generation. [[CHECK: which model families, e.g. SDXL/Flux/video models]]
- At work, I design and use model-agnostic AI agents for log investigation and large stories, combining written product knowledge, codebase access and structured output formats to speed up delivery.

## Technical detail

- Hardware: [[CHECK: current GPU and VRAM; the old site mentioned an RTX 3080 with 16GB VRAM in a laptop]]
- [[CHECK: quantisation choices, which models fit, typical tokens/s]]

## Results

[[CHECK: anything quantitative, or a short list of models run]]
