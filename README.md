# Client-Side Injections

This repository contains a collection of **client-side JavaScript injection scripts** designed for rapid experiments, personalization, and growth-focused use cases.  

The goal is to provide simple, self-contained snippets that can be easily injected into existing websites (via browser console, Google Tag Manager, or A/B testing platforms) to test new UI elements, track interactions, and deliver personalized experiences.

---

## 🚀 Purpose
- Enable **fast prototyping** of growth and marketing ideas  
- Support **personalization** based on user behavior (e.g., last visited category)  
- Inject **banners, popups, and widgets** without backend changes  
- Track **user interactions and events** directly on the client side  

---

## 🛠 How It Works
Each project is written as a single **IIFE (Immediately Invoked Function Expression)** to ensure isolation and prevent conflicts with the host page.  

A typical script follows this structure:
```javascript
(() => {
  const init = () => {
    buildHTML();
    buildCSS();
    setEvents();
  };

  const buildHTML = () => {
    // Inject HTML elements into the page
  };

  const buildCSS = () => {
    // Inject required styles
  };

  const setEvents = () => {
    // Bind user interaction events
  };

  init();
})();
