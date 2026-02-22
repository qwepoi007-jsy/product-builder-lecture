# Project Blueprint: Engineering E-Book Portfolio

## Overview
An interactive web-based e-book designed for a high school "Introduction to Engineering" course. This platform serves as a comprehensive archive of the 15-week curriculum and a showcase for student projects, featuring a modern, tech-oriented aesthetic with a focus on usability and responsive design.

## Design & Features
- **Aesthetic:** Modern, minimalist white/gray palette with electric blue/neon accents. Tech-focused typography.
- **Layout:** Fixed sticky sidebar for seamless navigation. Fluid, responsive main content area.
- **Navigation:** Deep-linked sections for "Understanding Engineering", "Core Technologies", and "Student Projects".
- **Components:**
    - **Sidebar:** Interactive navigation with active state tracking.
    - **Home:** Hero typography, 15-week linear timeline, and project highlight slider.
    - **Interactive Elements:** Accordions for curriculum details, Grid layouts for project cards, and Step-based UI for project walkthroughs.

## Current Implementation Plan (Phase 2)
1.  **Class Operation Section (#intro):**
    *   Implement a 3-Phase Accordion UI for the 15-week curriculum.
    *   Phase 1 (Notion), Phase 2 (AI), Phase 3 (Antigravity).
2.  **Evaluation Plan Section:**
    *   Create a rubric-based evaluation table.
    *   Add "Percentage Cards" to highlight the weight of each evaluation factor.
3.  **Interactivity:**
    *   Add JavaScript logic for accordion toggles (open/close).
    *   Implement SPA-style section switching in `main.js`.
4.  **Styling:**
    *   Add custom styles for accordions (plus/minus icons, smooth height transitions).
    *   Style the evaluation table with a modern, borderless look and subtle hover effects.
