# Eco Remix Studio: Brand Guidelines

Welcome to the official Brand Guidelines for **Eco Remix Studio**. This document outlines the core visual identity, UI components, motion physics, and typography required to maintain our cinematic, AI-powered "NeoLab" aesthetic.

---

## 1. Brand Identity
**Mission**: To gamify and accelerate the upcycling of household waste into premium, functional art.
**Vibe**: A living, reactive, cinematic digital environment. It feels like a high-tech planetary defense terminal fused with a modern maker space.

---

## 2. Color Palette
Our color system relies heavily on deep space purples, glowing lilacs, and tech-blue accents. Transparency and glassmorphism are critical to the identity.

| Name | Hex / RGBA | Usage |
| :--- | :--- | :--- |
| **Neo Background** | `#230C33` | The absolute base layer. Deep, immersive purple. |
| **Neo Accent** | `#CA9CE1` | Primary glowing highlight. Used for icons, active states, and emphasis. |
| **Neo Blue** | `#A9D6E5` | Secondary tech highlight. Used for AI scanners, quantities, and digital readouts. |
| **Glass Card** | `rgba(89, 46, 131, 0.25)` | The base fill for all UI panels. Must be combined with blur. |
| **Neo Border** | `rgba(255, 255, 255, 0.12)`| Subtle bordering to define glass shapes against the dark background. |

### Gradients
- **Neo Gradient**: `linear-gradient(135deg, rgba(89, 46, 131, 0.4), rgba(35, 12, 51, 0.1))`
- **Button Gradient**: `linear-gradient(90deg, rgba(202, 156, 225, 0.2), transparent)`

---

## 3. Typography
**Primary Font**: `Inter` (Google Fonts)
We use Inter for its clean, technical, and highly legible geometric structure. 

- **Headers** (`<h1>`, `<h2>`): Bold (`700`), tightly tracked (`tracking-tight`).
- **Body** (`<p>`): Regular (`400`) or Medium (`500`), slightly faded (`text-white/70`), with relaxed line heights (`leading-relaxed`).
- **Micro-copy / Badges**: Extra Small (`text-xs`), Uppercase, widely tracked (`tracking-wider`), and Bold.

---

## 4. UI Components & Materials

### The Glassmorphism System (`.glass`)
No solid blocks. All UI surfaces must feel like physical glass floating in front of the background.
```css
.glass {
  background: rgba(89, 46, 131, 0.25);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.5rem; /* Large, friendly curves */
}
```

### Buttons
Buttons must feature the `btn-spring` animation. They should look mechanical and tactile.
- **Primary**: Uses `bg-button-gradient` with a `neoAccent/40` border.
- **Secondary**: Uses `bg-white/10` with a `white/20` border.

### Inputs
Text fields use the `input-glow` class. They rest with a subtle neoBorder, but on focus, they emit a solid `neoAccent` glow with an inner and outer shadow.

---

## 5. Motion & Physics Engine
We use `framer-motion` alongside pure CSS to create an Awwwards-level interactive experience. Motion must be fluid, eased, and physical.

### Standard Easing
- **Cinematic Spring**: `cubic-bezier(0.25, 1.5, 0.5, 1)` (Used for hover lifts and button presses).
- **Smooth Fade**: `cubic-bezier(0.25, 1, 0.5, 1)` (Used for scroll reveals and scanning).

### Core Interactions
1. **Hover Lift (`.hover-lift`)**: Cards organically float up by `-8px`, scale slightly to `1.02`, and cast a deep drop shadow mixed with a subtle purple glow.
2. **Button Spring (`.btn-spring`)**: Buttons mechanically push inward (`translateY(2px)`, `scale(0.98)`) when clicked, removing their shadow to simulate physical depth.
3. **AI Scanner (`.ai-scanner`)**: A horizontal blue gradient line that sweeps from top to bottom across AI-powered components.
4. **3D Scroll Reveal (`Scroll3DWrapper`)**: As elements enter the viewport, they organically tilt on the X-axis from 20 degrees down to 0, scaling up from 0.8x to full size.

---

## 6. Integration of Spline 3D Models
*Guidelines for integrating upcoming Spline 3D assets.*
- 3D models should complement the glassmorphism, not overpower it.
- Models should use lighting that matches the deep purple/blue ambient environment of the NeoLab.
- Always implement soft, floating idle animations for 3D objects to match the site's living, breathing aesthetic.
