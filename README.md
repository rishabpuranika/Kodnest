# KodNest Premium Build System

A premium SaaS design system built with calm, intentional, and coherent design principles.

## Design Philosophy

- **Calm**: No flashy animations or visual noise
- **Intentional**: Every element serves a purpose
- **Coherent**: Consistent visual language throughout
- **Confident**: Strong typography and generous spacing

## Design System Specifications

### Color System
- **Background**: `#F7F6F3` (off-white)
- **Primary Text**: `#111111`
- **Accent**: `#8B0000` (deep red)
- **Success**: `#4A6741` (muted green)
- **Warning**: `#B8860B` (muted amber)

Maximum 4 colors across the entire system.

### Typography
- **Headings**: Serif font (Crimson Text), large, confident, generous spacing
- **Body**: Clean sans-serif (Inter), 16–18px, line-height 1.6–1.8
- **Max Text Width**: 720px for text blocks

### Spacing System
Consistent 8px scale:
- `8px` (xs)
- `16px` (sm)
- `24px` (md)
- `40px` (lg)
- `64px` (xl)

### Layout Structure

Every page follows this structure:

1. **Top Bar**
   - Left: Project name
   - Center: Progress indicator (Step X / Y)
   - Right: Status badge (Not Started / In Progress / Shipped)

2. **Context Header**
   - Large serif headline
   - 1-line subtext
   - Clear purpose, no hype language

3. **Main Content**
   - **Primary Workspace** (70% width): Main product interaction
   - **Secondary Panel** (30% width): Step explanation, copyable prompt, action buttons

4. **Proof Footer**
   - Checklist style with proof inputs
   - Items: UI Built, Logic Working, Test Passed, Deployed

### Components

All components follow consistent styling:
- **Primary Button**: Solid deep red background
- **Secondary Button**: Outlined style
- **Inputs**: Clean borders, clear focus state
- **Cards**: Subtle border, balanced padding, no drop shadows
- **Transitions**: 150–200ms, ease-in-out, no bounce

### Interaction Rules

- Transitions: 150–200ms, ease-in-out
- No bounce effects
- No parallax
- Focus states use subtle shadow ring

### Error & Empty States

- **Errors**: Explain what went wrong + how to fix, never blame user
- **Empty States**: Provide next action, never feel dead

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  components/        # React components
  styles/           # Design system CSS
    design-system.css  # Design tokens and base styles
    components.css     # Component styles
    layout.css        # Layout styles
  App.tsx           # Main app component
  main.tsx          # Entry point
```

## Usage

Import components and styles:

```tsx
import { TopBar, ContextHeader, PrimaryWorkspace, SecondaryPanel, ProofFooter } from './components';
import './styles/design-system.css';
import './styles/components.css';
import './styles/layout.css';
```

## Design Principles

1. **No Visual Drift**: Everything feels like one mind designed it
2. **Consistent Spacing**: Always use the 8px scale
3. **Predictable Components**: Same hover effects and border radius everywhere
4. **Calm Interactions**: Subtle transitions, no animation noise
5. **Clear Hierarchy**: Typography and spacing create visual hierarchy
