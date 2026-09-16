// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
// React core library import required for JSX interpretation and StrictMode
import React from 'react';

// ReactDOM client module: Provides modern rendering methods for browser web environments
import ReactDOM from 'react-dom/client';

// Root Application Component: The main UI container holding all pages and features
import App from './App';

// Global Stylesheet: Loads Tailwind CSS directives and custom base styles across the entire app
import './index.css';


// ==========================================
// 2. APPLICATION ENTRY POINT & ROOT MOUNTING
// ==========================================

// `document.getElementById('root')`: Selects the single `<div id="root"></div>` element in `index.html`.
// `!`: TypeScript Non-Null Assertion Operator. Tells TypeScript: "We guarantee this HTML element exists in index.html, so don't throw a null warning."
// `ReactDOM.createRoot(...)`: Initializes React 18's Concurrent Rendering engine at the specified DOM node.
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  // ----------------------------------------
  // REACT STRICT MODE
  // A development-only wrapper that helps catch common bugs early by:
  // 1. Warning about deprecated lifecycle methods or impure renders.
  // 2. Intentionally double-invoking effect hooks in dev mode to verify cleanup logic.
  // Note: StrictMode produces no extra DOM nodes and has zero impact in production builds.
  // ----------------------------------------
  <React.StrictMode>
    {/* Renders the top-most App component into the HTML DOM root */}
    <App />
  </React.StrictMode>
);