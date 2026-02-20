# AI Pictionary (你画我猜) - Specification

## 1. Project Overview

- **Project Name**: AI Pictionary (你画我猜)
- **Type**: Web Game
- **Core Functionality**: Players draw on a canvas while an AI (Gemini) attempts to guess what they're drawing in real-time
- **Target Users**: Casual gamers, friends looking for fun drawing challenges

## 2. UI/UX Specification

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  Header: Logo + Game Title                      │
├─────────────────────────────────────────────────┤
│                                                 │
│   ┌─────────────────────────────────────┐       │
│   │         Drawing Canvas              │       │
│   │           (600x450)                 │       │
│                                                 │
│   ┌─────────────────────────────────────┐       │
│   │  Tool Bar: Colors | Brush Size |    │       │
│   │            Clear | Submit           │       │
│   └─────────────────────────────────────┘       │
│                                                 │
│   ┌─────────────────────────────────────┐       │
│   │  AI Guess Area                      │       │
│   └─────────────────────────────────────┘       │
│                                                 │
│   ┌─────────────────────────────────────┐       │
│   │  Prompts: [Cat] [Sun] [Tree] ...    │       │
│   └─────────────────────────────────────┘       │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Responsive Breakpoints
- **Desktop**: > 768px - Full layout
- **Mobile**: ≤ 768px - Stacked layout, canvas scales down

### Visual Design

#### Color Palette
- **Background**: #1a1a2e (deep navy)
- **Canvas Background**: #ffffff (white)
- **Primary**: #ff6b6b (coral red)
- **Secondary**: #4ecdc4 (teal)
- **Accent**: #ffe66d (warm yellow)
- **Text Primary**: #f7f7f7
- **Text Secondary**: #a0a0a0

#### Typography
- **Heading Font**: "Fredoka One", cursive (playful, rounded)
- **Body Font**: "Nunito", sans-serif
- **Title**: 48px
- **Headings**: 24px
- **Body**: 16px

#### Spacing System
- **Base unit**: 8px
- **Section padding**: 24px
- **Component gaps**: 16px

#### Visual Effects
- Canvas: 8px shadow with rgba(0,0,0,0.3)
- Buttons: Scale transform on hover (1.05), smooth transitions
- AI guess area: Typing animation effect
- Color buttons: Ring highlight when selected

### Components

#### Drawing Canvas
- HTML5 Canvas element
- Mouse/touch support
- Smooth line drawing with bezier curves

#### Tool Bar
- **Color Picker**: 8 preset colors
  - #000000 (black)
  - #ff6b6b (red)
  - #4ecdc4 (teal)
  - #ffe66d (yellow)
  - #95e1d3 (mint)
  - #a855f7 (purple)
  - #f97316 (orange)
  - #3b82f6 (blue)
- **Brush Size**: Slider (2-30px)
- **Clear Button**: Resets canvas
- **Submit Button**: Sends to AI for guessing

#### AI Guess Display
- Shows current guess with confidence
- Animated typing effect
- History of previous guesses

#### Prompt Cards
- Random word prompts to draw
- Click to select new prompt
- Categories: Animals, Objects, Nature, Food

## 3. Functionality Specification

### Core Features

1. **Drawing System**
   - Freehand drawing with mouse/touch
   - Configurable brush color and size
   - Clear canvas functionality
   - Smooth line rendering

2. **AI Guessing**
   - Convert canvas to base64 image
   - Send to Gemini API (direct REST call)
   - Display AI's guess with loading state

3. **Prompt System**
   - Predefined word prompts
   - Random prompt selection

4. **API Integration**
   - Direct Gemini API call (no SDK)
   - API endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
   - Include API key from environment variable
   - Handle loading and error states

### Edge Cases
- Empty canvas submission: Show warning
- API error: Display error message, allow retry
- Network failure: Show offline message

## 4. Acceptance Criteria

- [ ] Canvas renders and accepts drawing input
- [ ] Brush color and size can be changed
- [ ] Clear button resets canvas
- [ ] Submit sends image to Gemini API
- [ ] AI guess displays on screen
- [ ] Random prompts are selectable
- [ ] Responsive on mobile devices
- [ ] Loading states work correctly
- [ ] Error handling works properly
