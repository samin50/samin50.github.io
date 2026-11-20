---
title: Local AI Inference
summary: Self-hosted open-weight LLMs and image and video generation on a laptop GPU, with Ollama, Open WebUI and ComfyUI in Podman containers sharing one model store.
description: Self-hosted open-weight LLMs and image/video generation with Ollama, Open WebUI and ComfyUI in Podman containers.
tier: featured
order: 7
hue: 195
icon: sparkles
tags: [ai, software, computer-vision]
dates:
  start: '2026-04'
status: ongoing
context: personal
team:
  size: 1
tech:
  - Ollama
  - Open WebUI
  - ComfyUI
  - Podman
  - WSL2
  - Linux
links: []
results:
  - value: '64 → 34 s'
    label: Image upscale pass after switching on SageAttention
  - value: '~12 min → 357 s'
    label: 5 s motion-transfer clip after VRAM fixes
  - value: '~15%'
    label: Container overhead vs native (Wan 2.2, RTX 3080)
  - value: '64K'
    label: Context for a 27B model on 24 GB VRAM
cover:
  type: image
  src: ../../assets/placeholders/placeholder.svg
  alt: '[[TODO: screenshot of a ComfyUI graph, at least 1600 px wide]]'
  todo: ComfyUI graph screenshot, at least 1600 px wide
---

## Overview

I self-host open-weight LLMs and image and video generation models on my local hardware. Ollama serves the language models, Open WebUI is the chat front end, and ComfyUI runs my image and video pipelines. All three run in Podman containers on WSL2 and read from one shared model store, and everything works offline in normal use.

## The problem

Hosted APIs are convenient, but I have an RTX 5090 to make use of - running models locally shows what open-weight models can actually do and what they cost in VRAM and latency.

I also wanted a setup I could rebuild. My first ComfyUI install was native on Windows and patched by hand, so I moved to containers with persistent volumes. I used Podman rather than Docker Desktop because I prefer open-source tooling.

## What I did

### The stack

- Ollama, Open WebUI and ComfyUI in Podman containers, defined in one Docker Compose file and run with podman-compose. The GPU is passed through with the NVIDIA Container Toolkit (CDI).
- All models, for Ollama and ComfyUI, live in one named volume on WSL2's ext4 filesystem. Everything else (custom nodes, Python packages, workflows, outputs, chat data) is a per-stack bind mount, so containers can be recreated without losing state.
- An interactive PowerShell launcher for starting and stopping the stack, checking status, opening logs and mounting a drive, plus a FileBrowser container for drag-and-drop model management. Stack settings live in a config file, so the same script runs a second, isolated stack that shares only the model volume.

### Pipelines and tools

- ComfyUI pipelines for image and video generation:
  - image-to-video with Wan 2.1/2.2 and LTX 2.3
  - image editing with Qwen-Image 2.1
  - upscaling with ESRGAN models through Ultimate SD Upscale, and SeedVR2 for video
- Vision-language models (Qwen 3.5 and Qwen3-VL) inside workflows to describe reference images automatically, so my own prompts can stay short.
- Prompt-writing agents in Open WebUI, running on a local 27B model.

## Technical detail

- **Hardware:** a laptop RTX 5090 (24 GB GDDR7, Blackwell) with 64 GB RAM. I started on a laptop RTX 3080 (16 GB) with 32 GB RAM.
- **Quantisation depends on the GPU.** On the 3080 (Ampere), FP8 and GGUF both dequantise to BF16, so the format changes headroom rather than speed; I used GGUF Q5_K_M. On the 5090, FP8 runs natively on the tensor cores and beat GGUF Q5_K_M for SCAIL-2. I use NVFP4 for LTX 2.3, because its FP8 checkpoint doesn't fit in 24 GB, but not for Wan 2.2, where NVFP4 broke image-to-video conditioning.
- **LLMs:** Qwen 3.6 27B at Q4_K_M (about 17 GB), with a Q8 KV cache and flash attention, fits a 64K context on the 24 GB card. On the 3080 I ran Qwen 3.5 4B and 9B. [[CHECK: typical tokens/s]]
- **VRAM is budgeted one model at a time.** Text encoders, CLIP vision, segmentation models and the VLM are unloaded before the diffusion model loads, because spilling into system RAM is far slower than reloading.
- **Storage:** the models were bind-mounted from Windows at first. Through WSL2's Windows-filesystem bridge they loaded 2–4× slower than from a named volume on ext4, so I moved them.
- **Rebuilding for a new GPU:** compiled extensions built on the 3080 (sm_86) don't run on the 5090 (sm_120). I rebuilt SageAttention, and a llama-cpp-python fork that adds the Qwen3-VL chat handler, inside the container. Later image updates switched the container OS to openSUSE Tumbleweed and changed PyTorch, so the SageAttention build is now a script. It works around a GCC release that is too new for CUDA 13.0, PyTorch's C++20 requirement and a CUDA/glibc header conflict.