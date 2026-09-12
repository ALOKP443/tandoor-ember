# Tandoor & Ember — Wood-Fired Indian Kitchen & Bar

> **A Delhi kitchen for big appetites.**  
> Tandoor-fired, slow-simmered, always neighborhood. Located in Hauz Khas Village, New Delhi.

---

## 🌟 Overview

**Tandoor & Ember** is a modern, high-performance, editorial landing page and digital menu built for a wood-fired Indian eatery located in Hauz Khas Village, New Delhi. 

Designed with a rich dark charcoal, cream, and warm copper aesthetic, the web application features dynamic animations, interactive dish exploration, client-side day-aware operating hours, interactive seating reservations, and full touch-optimized mobile responsiveness.

---

## 🔥 Key Features

### 1. 🍶 Sticky Frosted Glass Navbar
- **Scroll-Triggered Transition**: Smoothly transitions from a fully transparent background to a frosted glass header (`backdrop-blur-md bg-black/50 border-b border-cream/15`) after 50px of vertical scrolling.
- **Mobile Menu Drawer**: Desktop nav links collapse into an animated hamburger menu drawer below tablet breakpoints (`768px`) with an interactive backdrop overlay (`bg-black/60`).
- **Smooth Anchor Navigation**: Instant smooth-scrolling to `#menu`, `#our-story`, `#visit`, and `#reserve`.

### 2. 🎆 Editorial Hero Section
- **Fluid Typography**: Responsive display text (`text-[clamp(2.75rem,11vw,11.5rem)]`) that scales seamlessly down to 375px mobile screens without clipping or overflow.
- **Vignette Overlay**: Linear dark gradient overlay ensuring high legibility against the background interior photography.
- **Single Source Tagline**: Dynamically displays operating schedule (`OPEN TUE–SUN · EST. 2019 · HAUZ KHAS VILLAGE`).

### 3. 🍲 Interactive Menu & Category Filter
- **25 Authentic Dishes**: Expanded dataset spanning 5 categories (*Starters*, *Mains*, *Wood-Fired*, *Drinks*, *Desserts*).
- **Horizontal Swipe Filter**: Mobile-optimized category selection pills (`touch-pan-x`) with smooth horizontal scrolling.
- **Veg Only Toggle**: Animated micro-toggle for filtering vegetarian offerings.
- **Micro-Badges**: Distinctive pill badges for `VEG` and `CHEF'S PICK`.
- **Framer Motion Animations**: `AnimatePresence` with staggered fade & slide-up item entrances (40–60ms stagger) and quick exits (150ms).
- **Dish Cards with Image Thumbnails**: `loading="lazy"` images with subtle rounded borders (`rounded-lg border border-ink/15 shadow-sm`).
- **Graceful Image Fallback**: Custom `DishThumbnail` component with `onError` handling that displays a warm dark charcoal/copper gradient with a `Flame` icon if an image fails to load.

### 4. 📖 Interactive Dish Detail Modal & Mobile Bottom Sheet
- **Mobile Bottom Sheet**: On mobile devices, dish detail views slide up from the bottom (`y: '100%'`) as a full-width bottom sheet with a native drag handle bar (`w-12 h-1 bg-cream/30 rounded-full`).
- **Top Photo Banner**: Expanded header image with a soft gradient overlay.
- **Detailed Insights**: Displays price, description, chef notes, pairings, ingredients list, and allergen disclaimers.

### 5. 📖 "Our Story" Section
- **Brand Narrative**: Highlights hardwood & sigri coal-fired cooking heritage.
- **Contained Image Zoom**: Photo containers feature an `overflow-hidden` wrapper with smooth zoom-on-hover effects (`group-hover:scale-105` / `active:scale-[1.02]`).

### 6. 📍 Visit & Hours Section
- **Dynamic Today Highlight**: Client-side date check automatically highlights the current day's hours with a warm copper `"Today"` pill badge.
- **Single Source Hours Data**: Synchronized operating schedule (Tuesday–Sunday, Closed Mondays).
- **Dark Duotone Map Embed**: Google Maps embed of Hauz Khas Village wrapped in a dark duotone CSS filter (`grayscale contrast-125 sepia-[.25] invert-[.9]`).
- **Accessibility Info**: Metro, auto-rickshaw, and parking micro-copy.

### 7. 🍷 Interactive Reservation Form
- **Seating Preference Selector**: Interactive pill group (*Dining Room*, *Chef's Hearth Counter*, *Covered Patio*).
- **Time Slot Selector**: Dropdown options (*5:30 PM, 6:00 PM, 7:15 PM, 8:00 PM, 8:45 PM, 9:30 PM*).
- **Party Size & Date Selection**: Touch-friendly input fields with native dark date picker styling (`[color-scheme:dark]`).
- **Form UX & Validation**: Custom focus rings (`focus:ring-2 focus:ring-cream/40`), inline error feedback, and animated button state transition (`Request Received — See You Soon`).

### 8. 📱 Mobile Responsiveness Audit
- Tested and verified at **375px** (small mobile), **390px** (standard mobile), and **768px** (tablet) viewports.
- Zero horizontal scrolling (`overflow-x-clip`).
- Touch target heights enforced (`min-h-[44px]` / `min-h-[48px]`).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** and **npm** or **pnpm** installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ALOKP443/tandoor-ember.git
   cd tandoor-ember
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

---

## 🛠️ Build & Type Check

To compile and verify TypeScript types without emitting files:
```bash
npx tsc --noEmit
```

To create a production build:
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```text
├── app/
│   ├── globals.css         # Custom design tokens, theme colors, and utility classes
│   ├── layout.tsx          # Root layout with Cormorant Garamond & Geist font configurations
│   └── page.tsx            # Main Tandoor & Ember landing page application
├── lib/
│   └── menu-data.ts        # Single source of truth for categories, dishes, and operating hours
├── public/
│   └── copper-char-*.png   # High-resolution food & interior photographic assets
├── components.json         # Shadcn configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---


