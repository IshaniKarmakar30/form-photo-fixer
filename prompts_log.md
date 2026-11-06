# Prompts Log: Project 2 - Form Photo Fixer

This document records the exact step-by-step prompts used to design, build, optimize, and test the offline **Form Photo Fixer** web tool according to the internship assignment guidelines.

## 1. Project Planning & Setup

### Prompt 1.1: Architecture & Requirements

> "I need to build an offline web tool called 'Form Photo Fixer' for job and exam application photos and signatures. It must run locally in a browser without internet or paid APIs. What is the cleanest, single-folder structure (HTML, CSS, JS) to handle image uploads, canvas cropping with face guides, and binary compression under strict KB limits?"

## 2. Core Feature Development

### Prompt 2.1: Canvas Cropping & Face Guide

> "Create an HTML5 canvas-based interface where a user can upload a high-resolution phone photo. Implement a center-crop function that adapts to specific aspect ratios (like 3.5cm x 4.5cm) and draw an overlay dashed face guide so the applicant can align their portrait before processing."

### Prompt 2.2: Preset Configurations (UPSC, SSC, Custom)

> "Add a preset dropdown menu containing at least 3 real Indian examination standards:
>
> 1. UPSC Civil Services (3.5 x 4.5 cm, 20 KB to 50 KB)
>
> 2. SSC CGL (3.5 x 4.5 cm, 20 KB limit)
>
> 3. IBPS PO Signature (4.5 x 3.5 cm, 10 KB to 20 KB)
>    Also include a toggleable 'Custom Preset' mode allowing users to specify exact pixel dimensions and a custom maximum KB threshold."

### Prompt 2.3: Iterative Compression Engine

> "Write a JavaScript function that takes the cropped canvas data and lowers the JPEG image quality step-by-step in a loop (`canvas.toBlob()`) until the resulting Blob size is just under the selected preset's maximum KB limit. Prevent blurry over-compression if the image already satisfies the limit."

## 3. Offline Verification & Download Handling

### Prompt 3.1: Blob Download & Validation UI

> "Generate a real-time status card showing:
>
> * Resulting file size in KB vs maximum limit
>
> * Output pixel dimensions
>
> * A 'Ready to upload' verification badge
>   Provide a direct one-click download button using an object URL (`URL.createObjectURL(blob)`)."

### Prompt 3.2: Offline & Performance Optimization

> "Ensure all stylesheets, scripts, and fonts run completely locally with no external CDN links or network calls. Verify that image processing handles large mobile camera photos (5MB+) entirely on client-side memory without crashing the browser tab."

## 4. Verification Checkpoints

* \[x\] **Preset Rules Match Official Guidelines:** Configured UPSC, SSC, and IBPS presets.

* \[x\] **File Size Verification:** Target output strictly stays within the allocated KB limits.

* \[x\] **100% Offline Capability:** Tested and functioning with Wi-Fi switched off.

* \[x\] **Prompt Preservation:** All prompts saved sequentially in this log.

## Official Reference Notices Used for Presets

1. **UPSC Civil Services Examination Notice:** [upsc.gov.in](https://upsc.gov.in) (Photo: 3.5 x 4.5 cm, 20–50 KB)

2. **SSC Combined Graduate Level (CGL) Notice:** [ssc.gov.in](https://ssc.gov.in) (Photo: 3.5 x 4.5 cm, 20 KB limit)

3. **IBPS CRP Probationary Officers Notice:** [ibps.in](https://ibps.in) (Signature: 10–20 KB)