# Valentine SPA Deployment Guide

This guide covers the deployment process for the Valentine single-page application to the Internet Computer.

## Prerequisites

- DFX CLI installed and configured
- Internet Computer wallet with cycles
- All static assets present in `frontend/public/assets/`

## Build Process

### 1. Pre-build Verification

Before building, verify that all required static assets are present:

**Background textures:**
- `frontend/public/assets/generated/valentine-bg-texture.dim_1920x1080.png`
- `frontend/public/assets/generated/heart-doodles.dim_1024x1024.png`

**User photos (6 default memory images):**
- `frontend/public/assets/user-photos/IMG_20260102_194134.jpg`
- `frontend/public/assets/user-photos/IMG_20260214_032137.jpg`
- `frontend/public/assets/user-photos/IMG_20250220_045805_370.jpg`
- `frontend/public/assets/user-photos/IMG_20260214_040600.jpg`
- `frontend/public/assets/user-photos/IMG_20260214_040639.jpg`
- `frontend/public/assets/user-photos/IMG_20260214_032137-1.jpg`

**Fallback images (6 generated placeholders):**
- `frontend/public/assets/generated/memory-01.dim_1200x800.png`
- `frontend/public/assets/generated/memory-02.dim_1200x800.png`
- `frontend/public/assets/generated/memory-03.dim_1200x800.png`
- `frontend/public/assets/generated/memory-04.dim_1200x800.png`
- `frontend/public/assets/generated/memory-05.dim_1200x800.png`
- `frontend/public/assets/generated/memory-06.dim_1200x800.png`

### 2. Build the Frontend

